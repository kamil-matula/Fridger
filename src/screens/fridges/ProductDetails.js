import React, { useState } from 'react';

import { View, Image, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  AppBar,
  ScrollViewLayout,
  Dialog,
  FloatingActionButton,
  InputField,
  Separator,
} from 'components';
import { ScoresContainer } from 'components/fridges';
import { displayToast, makeStyles, dateFromFrontToBack } from 'utils';
import { deleteIcon, time, calendar } from 'assets/icons';
import {
  useDeleteFridgeProductMutation,
  useEditFridgeProductMutation,
} from 'services/fridger/fridgeProducts';

const ProductDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Queries:
  const [editProductQuery, { isLoading }] = useEditFridgeProductMutation();
  const [deleteProductQuery] = useDeleteFridgeProductMutation();

  // Data from previous screen:
  const {
    fridgeName,
    productID,
    productName,
    productProducer,
    productBarcode,
    productExpirationDate,
  } = route.params;

  // Data from Open Food Facts API:
  const retrieveProductDetails = (code) => {
    if (code) {
      // TODO: Send request to API:
      return null;
    }
    return null;
  };
  const productWithBarcode = retrieveProductDetails(productBarcode);

  // Form states:
  const { control, handleSubmit, setFocus, setValue, reset } = useForm({
    defaultValues: {
      name: productName,
      producer: productProducer,
      expiration: productExpirationDate,
    },
  });
  const rules = {
    name: {
      required: 'Name is required',
    },
    expiration: {
      pattern: {
        value: /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/,
        message: 'Invalid date format',
      },
    },
  };

  // Deleting product from fridge:
  const [deleteProductDialogVisible, setDeleteProductDialogVisible] =
    useState(false);
  const confirmRemoveProduct = () => {
    deleteProductQuery(productID)
      .unwrap()
      .then(() => {
        displayToast('Product deleted');
        setDeleteProductDialogVisible(false);
        navigation.pop();
      })
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to delete product')
      );
  };
  const cancelRemoveProduct = () => setDeleteProductDialogVisible(false);

  // Changing product's expiration date:
  const [changeExpDateDialogVisible, setChangeExpDateDialogVisible] =
    useState(false);
  const confirmChangeExpDate = (data) => {
    editProductQuery({
      id: productID,
      expiration: dateFromFrontToBack(data.expiration),
    })
      .unwrap()
      .then(() => {
        displayToast('Expiration date changed');
        setChangeExpDateDialogVisible(false);
      })
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to change expiration date'
        )
      );
  };
  const cancelChangeExpDate = () => {
    setChangeExpDateDialogVisible(false);
    reset();
  };

  // Submitting form:
  const editProduct = (data) => {
    editProductQuery({
      id: productID,
      name: data.name,
      producer: data.producer,
    })
      .unwrap()
      .then(() => {
        displayToast('Product details changed');
        navigation.goBack();
      })
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to edit product details'
        )
      );
  };

  // Helper function for retrieving friendly date from datePicker:
  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  // Changing expiration date:
  const [date, setDate] = useState(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);
  const onDateChange = (_, selectedDate) => {
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

    // TODO: Fix it on iOS devices
  };

  return (
    <View style={styles.container}>
      <AppBar
        icon1={time}
        onPressIcon1={() => setChangeExpDateDialogVisible(true)}
        icon2={deleteIcon}
        onPressIcon2={() => setDeleteProductDialogVisible(true)}
      />

      {/* Rendering appropriate content: details for products with barcodes, 
          editable input fields for other ones */}
      {productWithBarcode ? (
        <ScrollViewLayout addPadding={false}>
          {/* Basic information */}
          <View style={styles.basicInfoContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <View style={styles.textsContainer}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.producer}>{product.producer}</Text>
              <Text style={styles.quantity}>
                {product.maxQuantity} {product.quantityType}
              </Text>
            </View>
          </View>
          <Divider />

          {/* Rating */}
          <ScoresContainer
            novaScore={product.nova}
            nutriScore={product.nutri}
            containerStyle={styles.ratingContainer}
            iconStyle={styles.icon}
          />
          <Divider />

          {/* Additives */}
          <View style={styles.additivesContainer}>
            <Text style={styles.additivesTitle}>Additives</Text>
            {product.additives.map((element) => (
              <Text key={element.code} style={styles.additivesRow}>
                {'   '}•{'   '}
                {element.code} - {element.description}
              </Text>
            ))}
          </View>
          <Divider />

          {/* Nutrients */}
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientHeader}>Nutrition facts</Text>
              <Text style={styles.nutrientHeader}>100 g / 100 ml</Text>
            </View>
            <Divider />
            {[
              ['Energy (kJ)', `${product.nutritions.energy} kJ`],
              ['Fat', `${product.nutritions.fat} g`],
              [
                '   •   Saturated fat',
                `${product.nutritions['saturated-fat']} g`,
              ],
              ['Carbohydrates', `${product.nutritions.carbohydrates} g`],
              ['   •   Sugars', `${product.nutritions.sugars} g`],
              ['Proteins', `${product.nutritions['saturated-fat']} g`],
              ['Salt', `${product.nutritions.salt} g`],
              ['   •   Sodium', `${product.nutritions.sodium} g`],
            ].map((element) => (
              <View key={element[0]}>
                <View style={styles.nutrientRow}>
                  <Text style={styles.nutrientText}>{element[0]}</Text>
                  <Text style={styles.nutrientText}>{element[1]}</Text>
                </View>
                <Divider />
              </View>
            ))}
          </View>
        </ScrollViewLayout>
      ) : (
        <View style={styles.noBarcodeContainer}>
          {/* Providing data */}
          <InputField
            control={control}
            rules={rules.name}
            onSubmitEditing={() => setFocus('producer')}
            name='name'
            label='Name'
            variant='data'
            returnKeyType='next'
            placeholder='Enter product name'
          />
          <Separator height={8} />
          <InputField
            control={control}
            rules={rules.producer}
            name='producer'
            label='Producer (optional)'
            variant='data'
            returnKeyType='next'
            placeholder='Enter producer name'
          />

          {/* Button at the bottom */}
          <FloatingActionButton
            label='Confirm'
            onPress={handleSubmit(editProduct)}
            centered
            confirm
            isLoading={!changeExpDateDialogVisible && isLoading}
          />
        </View>
      )}

      {/* Deleting product from fridge */}
      <Dialog
        title='Delete product'
        paragraph={`Are you sure you want to delete product ${productName} from fridge ${fridgeName}? This action cannot be undone.`}
        visibilityState={[
          deleteProductDialogVisible,
          setDeleteProductDialogVisible,
        ]}
        label1='delete'
        onPressLabel1={confirmRemoveProduct}
        label2='cancel'
        onPressLabel2={cancelRemoveProduct}
      />

      {/* Changing expiration date */}
      <Dialog
        title='Set expiration date'
        visibilityState={[
          changeExpDateDialogVisible,
          setChangeExpDateDialogVisible,
        ]}
        label1='cancel'
        onPressLabel1={cancelChangeExpDate}
        label2='ok'
        onPressLabel2={handleSubmit(confirmChangeExpDate)}
        titlePaddingBottom={0}
      >
        <View style={styles.calendarFieldContainer}>
          <InputField
            control={control}
            rules={rules.expiration}
            name='expiration'
            variant='data'
            icon={calendar}
            onIconPress={() => setDatepickerVisible(true)}
            placeholder='dd.MM.rrrr'
            returnKeyType='done'
            keyboardType='numeric'
          />
        </View>
      </Dialog>

      {/* Calendar */}
      {datepickerVisible && (
        <DateTimePicker value={date} mode='date' onChange={onDateChange} />
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  // General:
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Basic info:
  basicInfoContainer: {
    flexDirection: 'row',
    margin: 16,
  },
  imageContainer: {
    width: 100,
  },
  image: { height: 100, resizeMode: 'contain' },
  textsContainer: {
    paddingLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: theme.colors.white,
    paddingBottom: 4,
  },
  producer: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
    paddingBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
  },

  // Rating:
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
  icon: {
    height: 48,
    resizeMode: 'contain',
  },

  // Additives:
  additivesContainer: {
    margin: 16,
  },
  additivesTitle: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
    paddingBottom: 4,
  },
  additivesRow: {
    fontSize: 14,
    color: theme.colors.white,
  },

  // Nutrients:
  nutrientsContainer: {
    margin: 16,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  nutrientHeader: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
  },
  nutrientText: {
    fontSize: 14,
    color: theme.colors.white,
  },

  // Changing expiration date:
  calendarFieldContainer: { paddingHorizontal: 16, height: 70 },

  // No-barcode variant's container:
  noBarcodeContainer: { marginHorizontal: 16, flex: 1 },
}));

export default ProductDetails;
