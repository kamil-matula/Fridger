import React, { useEffect, useState } from 'react';

import { View, Image, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

import {
  AppBar,
  FloatingActionButton,
  InputField,
  Separator,
  ActivityIndicator,
  DatePicker,
} from 'components';
import { ScoresContainer } from 'components/fridges';
import { displayToast, makeStyles } from 'utils';
import { deleteIcon, calendar, edit, visibilityOn } from 'assets/icons';
import { useEditFridgeProductMutation } from 'services/fridger/fridgeProducts';
import { useLazyProductQuery } from 'services/openFoodFacts/openFoodFactsApi';
import { DeleteFridgeProduct } from 'dialogs';

const ProductDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Data from previous screen:
  const {
    fridgeName,
    productID,
    productName,
    productProducer,
    productBarcode,
    productExpirationDate,
  } = route.params;

  // Mode (if product has barcode, there will be details by default):
  const [mode, setMode] = useState(productBarcode ? 'watch' : 'edit');

  // Queries:
  const [editProductQuery, { isLoading: isEditLoading }] =
    useEditFridgeProductMutation();
  const [productQuery, product] = useLazyProductQuery();

  // Open Food Facts stuff:
  const [productWithBarcode, setProductWithBarcode] = useState(null);
  useEffect(() => {
    if (product.isSuccess) setProductWithBarcode(product.data?.product);
  }, [product.isSuccess]);
  useEffect(() => {
    if (product.isError) displayToast('Unable to get product details');
  }, [product.isError]);
  useEffect(() => {
    if (productWithBarcode == null && !!productBarcode) {
      productQuery(productBarcode);
    }
  }, []);

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

  // Visibilities:
  const [deletingDialogVisible, setDeletingDialogVisible] = useState(false);
  const [expDateDialogVisible, setExpDateDialogVisible] = useState(false);

  // Editing name & producer:
  const editProduct = (data) => {
    editProductQuery({
      id: productID,
      name: data.name,
      producer: data.producer,
      expiration: data.expiration,
    })
      .unwrap()
      .then(() => {
        displayToast('Product details changed');
        reset();
        navigation.goBack();
      })
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to edit product details'
        )
      );
  };

  const getAppBarIcon = () => {
    // Changing modes is available only for products with the barcode
    if (productBarcode) return mode === 'watch' ? edit : visibilityOn;
    return null;
  };

  return (
    <View style={styles.container}>
      <AppBar
        icon1={getAppBarIcon()}
        onPressIcon1={() => setMode((m) => (m === 'watch' ? 'edit' : 'watch'))}
        icon2={deleteIcon}
        onPressIcon2={() => setDeletingDialogVisible(true)}
      />

      {/* Rendering product details (for products with barcode in watch mode) */}
      {mode === 'watch' && productWithBarcode == null && <ActivityIndicator />}
      {mode === 'watch' && productWithBarcode != null && (
        <ScrollView>
          {/* Basic information */}
          <View style={styles.basicInfoContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: productWithBarcode.image_front_small_url }}
                style={styles.image}
              />
            </View>
            <View style={styles.textsContainer}>
              <Text style={styles.name}>{productWithBarcode.product_name}</Text>
              <Text style={styles.producer}>{productWithBarcode.brands}</Text>
              <Text style={styles.quantity}>{productWithBarcode.quantity}</Text>
              {productExpirationDate && (
                <Text style={styles.expirationDate}>
                  Expiration date: {productExpirationDate}
                </Text>
              )}
            </View>
          </View>
          <Divider />

          {/* Rating */}
          <ScoresContainer
            novaScore={productWithBarcode.nova_groups}
            nutriScore={productWithBarcode.nutriscore_grade}
            containerStyle={styles.ratingContainer}
            iconStyle={styles.icon}
          />
          <Divider />

          {/* Nutrients */}
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrientRow}>
              <Text style={styles.nutrientHeader}>Nutrition facts</Text>
              <Text style={styles.nutrientHeader}>100 g / 100 ml</Text>
            </View>
            <Divider />
            {[
              ['Energy (kJ)', `${productWithBarcode.nutriments.energy} kJ`],
              ['Fat', `${productWithBarcode.nutriments.fat} g`],
              [
                '   •   Saturated fat',
                `${productWithBarcode.nutriments['saturated-fat']} g`,
              ],
              [
                'Carbohydrates',
                `${productWithBarcode.nutriments.carbohydrates} g`,
              ],
              ['   •   Sugars', `${productWithBarcode.nutriments.sugars} g`],
              [
                'Proteins',
                `${productWithBarcode.nutriments['saturated-fat']} g`,
              ],
              ['Salt', `${productWithBarcode.nutriments.salt} g`],
              ['   •   Sodium', `${productWithBarcode.nutriments.sodium} g`],
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
        </ScrollView>
      )}

      {/* Rendering editable input fields (for products in edit mode) */}
      {mode === 'edit' && (
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
            maxLength={25}
          />
          <Separator height={8} />
          <InputField
            control={control}
            onSubmitEditing={() => setFocus('expiration')}
            name='producer'
            label='Producer (optional)'
            variant='data'
            returnKeyType='next'
            placeholder='Enter producer name'
            maxLength={25}
          />
          <TouchableWithoutFeedback
            onPress={() => setExpDateDialogVisible(true)}
          >
            <InputField
              control={control}
              rules={rules.expiration}
              name='expiration'
              label='Expiration date (optional)'
              variant='data'
              icon={calendar}
              placeholder='dd.MM.rrrr'
              inputFieldWith={140}
              editable={false}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
      {mode === 'edit' && (
        <FloatingActionButton
          label='Confirm'
          onPress={handleSubmit(editProduct)}
          centered
          confirm
          isLoading={isEditLoading}
        />
      )}

      {/* Deleting product from fridge */}
      <DeleteFridgeProduct
        visible={deletingDialogVisible}
        setVisible={setDeletingDialogVisible}
        productID={productID}
        productName={productName}
        fridgeName={fridgeName}
        navigation={navigation}
      />

      {/* Changing expiration date */}
      <DatePicker
        visible={expDateDialogVisible}
        setVisible={setExpDateDialogVisible}
        setExpirationDate={(value) => setValue('expiration', value)}
      />
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
  expirationDate: {
    marginTop: 2,
    fontSize: 12,
    color: theme.colors.tartOrange,
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

  // No-barcode variant's container:
  noBarcodeContainer: { marginHorizontal: 16 },
}));

export default ProductDetails;
