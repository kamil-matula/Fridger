import React, { useState, useEffect, useRef } from 'react';

import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  InputField,
  ScrollViewLayout,
  AppBar,
  FloatingActionButton,
  Separator,
  Button,
  DatePicker,
  BottomSheet,
  SheetRow,
} from 'components';
import { ProductInfo } from 'components/fridges';
import {
  makeStyles,
  displayToast,
  convertToNumber,
  listOfUnits,
  convertQuantity,
} from 'utils';
import { edit, calendar, expand, check } from 'assets/icons';

import { useLazyProductQuery } from 'services/openFoodFacts/openFoodFactsApi';
import { useAddFridgeProductMutation } from 'services/fridger/fridgeProducts';

const AddProductAutomat = ({ navigation, route }) => {
  const { fridgeID } = route.params;
  const styles = useStyles();

  // Queries:
  const [addProductQuery, { isLoading }] = useAddFridgeProductMutation();

  // Scanner states:
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Details from Open Food Facts API:
  const [productQuery, product] = useLazyProductQuery();
  useEffect(() => {
    if (product.isSuccess) {
      if (!product.data?.product) {
        displayToast("Sorry! This product doesn't exist in the database");
      } else if (product.data?.product?.quantity) {
        const matchUnit = listOfUnits.find((e) =>
          product.data?.product?.quantity.endsWith(e.short)
        );
        if (matchUnit) {
          setValue('unit', matchUnit.short);
          setValue(
            'quantity',
            product.data?.product?.quantity.slice(0, -matchUnit.short.length)
          );
        } else {
          setValue('unit', 'pcs');
          setValue('quantity', 1);
        }
      }
    }
    if (product.isError) {
      displayToast('Unable to get product details');
    }
  }, [product.isSuccess, product.isError, product.data]);

  // Requesting camera permission on launch:
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handling with data from barcode:
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    productQuery(data);
  };

  // Form states:
  const { control, handleSubmit, setValue, getValues, reset, watch } = useForm({
    defaultValues: {
      expiration: '',
      quantity: '1',
      unit: 'pcs',
    },
  });
  const rules = {
    quantity: {
      required: 'Quantity is required',
    },
    expiration: {
      pattern: {
        value: /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/,
        message: 'Invalid date format',
      },
    },
    unit: {
      required: 'Unit is required',
    },
  };

  // Bottom sheet with quantity types:
  const refBS = useRef(null);
  const showBottomSheet = () => refBS.current.open();

  // Quantity type:
  const unit = watch('unit');
  const changeUnit = (newUnit) => {
    setValue(
      'quantity',
      convertQuantity(getValues('quantity'), getValues('unit'), newUnit)
    );
    setValue('unit', newUnit);
    refBS.current.close();
  };

  // Calendar states:
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  // Submitting form:
  const addProduct = (data) => {
    // Combine all data into one object:
    data.name = product.data?.product?.product_name;
    data.producer = product.data?.product?.brands;
    data.barcode = product.data?.code;
    data.image = product.data?.product.image_front_small_url;
    data.fridge = fridgeID;
    data.unit = 'pcs';
    // TODO: Replace hardcoded unit with some calculations OR remove displaying
    // quantity from ProductInfo and add input field with suggested value

    // Send request to API:
    addProductQuery(data)
      .unwrap()
      .then(() => {
        reset({
          quantity: '1',
          expiration: '',
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        if (error.data?.name) displayToast('Invalid name of fridge');
        else
          displayToast(error.data?.non_field_errors || 'Unable to add fridge');
      });
  };

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={edit}
        onPressIcon1={() =>
          navigation.replace('AddProductManual', { fridgeID })
        }
      />

      {/* Scanning barcode */}
      <View style={styles.scannerContainer}>
        {hasPermission === null && (
          <Text style={styles.accessText}>
            Requesting for camera permission
          </Text>
        )}
        {hasPermission === false && (
          <Text style={styles.accessText}>No access to camera</Text>
        )}
        {hasPermission && !scanned && (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.scanner}
          />
        )}
        {hasPermission && scanned && (
          <Button
            label='scan again'
            variant='text'
            onPress={() => setScanned(false)}
          />
        )}
      </View>

      {/* Product data from API */}
      <ProductInfo
        text={product.data?.product?.product_name}
        subtext1={product.data?.product?.brands}
        subtext2={product.data?.product?.quantity}
        nutri={product.data?.product?.nutriscore_grade}
        nova={product.data?.product?.nova_groups}
      />
      <Divider />

      {/* Providing data */}
      <ScrollViewLayout>
        <View>
          <Separator height={16} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 140 }}>
              <InputField
                control={control}
                rules={rules.quantity}
                name='quantity'
                label='Quantity'
                keyboardType='numeric'
                variant='data'
                returnKeyType='next'
                textAlign='right'
                onChangeText={convertToNumber}
              />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ width: 80 }}>
              <InputField
                control={control}
                rules={rules.unit}
                name='unit'
                label=' '
                variant='data'
                editable={false}
                icon={expand}
                onInputFieldPress={showBottomSheet}
              />
            </View>
          </View>
          <InputField
            control={control}
            rules={rules.expiration}
            name='expiration'
            label='Expiration date (optional)'
            variant='data'
            placeholder='dd.MM.rrrr'
            icon={calendar}
            onInputFieldPress={() => setDatepickerVisible(true)}
            inputFieldWith={140}
            editable={false}
          />
        </View>
        <Separator height={60} />
      </ScrollViewLayout>

      {/* Calendar */}
      <DatePicker
        setExpirationDate={(value) => setValue('expiration', value)}
        visible={datepickerVisible}
        setVisible={setDatepickerVisible}
      />

      {/* Quantity types */}
      <BottomSheet reference={refBS} title='Choose unit'>
        {listOfUnits.map((element) => (
          <SheetRow
            key={element.long}
            icon={unit === element.short ? check : null}
            text={element.long}
            onPress={() => changeUnit(element.short)}
          />
        ))}
      </BottomSheet>

      {/* Button at the bottom */}
      <FloatingActionButton
        label='Add product'
        onPress={handleSubmit(addProduct)}
        centered
        isLoading={isLoading}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scannerContainer: {
    height: '30%',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.colors.richBlack,
  },
  scanner: {
    height: '100%',
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  text: {
    color: theme.colors.text,
  },
  accessText: {
    fontSize: 24,
    color: theme.colors.tartOrange,
  },
}));

export default AddProductAutomat;
