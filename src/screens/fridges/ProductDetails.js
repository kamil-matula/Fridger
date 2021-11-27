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
import { makeStyles } from 'utils';
import { deleteIcon, time, calendar } from 'assets/icons';
import { productsInFridgeList } from 'tmpData';

const ProductDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Identifying product:
  const { productID, fridgeID, fridgeName } = route.params;
  const product = productsInFridgeList.find((e) => e.id === productID);

  // Form states:
  const { control, handleSubmit, setFocus, setValue, reset } = useForm({
    defaultValues: {
      name: product.name,
      producer: product.producer,
      expirationDate: product.expirationDate,
    },
  });
  const rules = {
    name: {
      required: 'Name is required',
    },
    expirationDate: {
      pattern: {
        value: /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/,
        message: 'Invalid date format',
      },
    },
  };

  // Deleting fridge:
  const [deleteProductDialogVisible, setDeleteProductDialogVisible] =
    useState(false);
  const confirmRemoveProduct = () => {
    // TODO: Send request to API and wait for removing product from the fridge
    console.log(
      `Product #${productID} has been deleted from fridge #${fridgeID}`
    );

    // Hide dialog and go back:
    setDeleteProductDialogVisible(false);
    navigation.pop();
  };
  const cancelRemoveProduct = () => {
    // Hide dialog:
    setDeleteProductDialogVisible(false);
  };

  // Changing product's expiration date:
  const [changeExpDateDialogVisible, setChangeExpDateDialogVisible] =
    useState(false);
  const confirmChangeExpDate = (data) => {
    // TODO: Send request to API and wait for changing expiration date
    console.log(
      `Product #${productID}'s expiration date has been changed from ${product.expirationDate} to ${data.expirationDate}`
    );

    // Hide dialog and go back:
    setChangeExpDateDialogVisible(false);
    navigation.pop();
  };
  const cancelChangeExpDate = () => {
    // Hide dialog:
    setChangeExpDateDialogVisible(false);
    reset();
  };

  // Submitting form:
  const editProduct = (data) => {
    // TODO: Send request to API to edit product
    if (data.name !== product.name || data.producer !== product.producer)
      console.log(
        `Product ${JSON.stringify({
          name: product.name,
          producer: product.producer,
        })} has been updated to ${JSON.stringify({
          name: data.name,
          producer: data.producer,
        })}`
      );

    // Go back:
    navigation.goBack();
  };

  // Helper function for retrieving friendly date from datePicker:
  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  // Changing expiration date:
  const [date, setDate] = useState(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);
  const onDateChange = (event, selectedDate) => {
    // Hide calendar:
    setDatepickerVisible(false);

    // Retrieve date:
    if (selectedDate !== undefined) {
      setDate(selectedDate);
      setValue('expirationDate', dateToString(selectedDate));
    } else {
      setDate(new Date());
      setValue('expirationDate', '');
    }

    // TODO: Make sure that it works on iOS devices
  };

  return (
    <View style={styles.container}>
      <AppBar
        icon1={time}
        icon2={deleteIcon}
        onPressIcon1={() => {
          // Open dialog responsible for changing expiration date
          setChangeExpDateDialogVisible(true);
        }}
        onPressIcon2={() => {
          // Open dialog responsible for deleting product
          setDeleteProductDialogVisible(true);
        }}
      />

      {/* Rendering appropriate content: details for products with barcodes, 
          editable input fields for other ones */}
      {product.barcode ? (
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
            label='Producer'
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
          />
        </View>
      )}

      {/* Deleting product from fridge */}
      <Dialog
        title='Delete product'
        paragraph={`Are you sure you want to delete product ${product.name} from fridge ${fridgeName}? This action cannot be undone.`}
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
            rules={rules.expirationDate}
            name='expirationDate'
            variant='data'
            icon={calendar}
            onIconPress={() => {
              setDatepickerVisible(true);
            }}
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
