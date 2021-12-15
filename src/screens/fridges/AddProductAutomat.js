import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  InputField,
  ScrollViewLayout,
  AppBar,
  FloatingActionButton,
  Separator,
  Button,
} from 'components';
import { ProductInfo } from 'components/fridges';
import { makeStyles } from 'utils';
import { edit, calendar } from 'assets/icons';

import { useLazyProductQuery } from 'services/openFoodFacts/openFoodFactsApi';

const AddProductAutomat = ({ navigation }) => {
  const styles = useStyles();

  // Scanner states:
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [productQuery, product] = useLazyProductQuery();

  // Requesting camera permission on launch:
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handling with data from barcode:
  const handleBarCodeScanned = ({ data }) => {
    // Update state:
    setScanned(true);
    productQuery(data);
  };

  // Form states:
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      expiration: '',
      quantity: '1',
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
  };

  // Date picker states:
  const [date, setDate] = useState(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  const onDateChange = (event, selectedDate) => {
    // Hide calendar:
    setDatepickerVisible(false);

    // Retrieve date:
    if (selectedDate !== undefined) {
      setDate(selectedDate);
      setValue('expiration', dateToString(selectedDate));
    } else {
      setDate(new Date());
      setValue('expiration', '');
    }

    // TODO: Fix it on iOS
  };

  // Helper function for retrieving friendly date from datePicker:
  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  // Submitting form:
  const addProduct = (data) => {
    // TODO: Send request to API to add product to fridge
    console.log(`Product ${JSON.stringify(data)} added to fridge`);

    // Reset states:
    reset({
      quantity: '1',
      expiration: '',
    });

    // Go back:
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={edit}
        onPressIcon1={() => navigation.replace('AddProductManual')}
      />

      {/* TODO: Add possibility to request permissions once again by clicking the label */}
      {/* Scanning barcode */}
      <View style={styles.scannerContainer}>
        {hasPermission && (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
            <View style={styles.buttonContainer}>
              <Button
                label='scan again'
                variant='text'
                onPress={() => setScanned(false)}
              />
              <Text style={styles.text}>{scanned ? 'tap scan again' : ''}</Text>
            </View>
          </>
        )}
        {hasPermission === null && (
          <Text style={styles.accessText}>
            Requesting for camera permission
          </Text>
        )}
        {hasPermission === false && (
          <Text style={styles.accessText}>No access to camera</Text>
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
          <View style={{ width: '50%' }}>
            <InputField
              control={control}
              rules={rules.quantity}
              name='quantity'
              label='Quantity'
              keyboardType='numeric'
              variant='data'
              returnKeyType='next'
              textAlign='right'
            />
          </View>
          <View style={{ width: '50%' }}>
            <InputField
              control={control}
              rules={rules.expiration}
              name='expiration'
              label='Expiration date'
              variant='data'
              returnKeyType='done'
              keyboardType='numeric'
              placeholder='dd.MM.rrrr'
              icon={calendar}
              onIconPress={() => setDatepickerVisible(true)}
            />
          </View>
        </View>
        <Separator height={60} />
      </ScrollViewLayout>

      {/* Calendar */}
      {datepickerVisible && (
        <DateTimePicker value={date} mode='date' onChange={onDateChange} />
      )}

      {/* Button at the bottom */}
      <FloatingActionButton
        label='Add product'
        onPress={handleSubmit(addProduct)}
        centered
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
