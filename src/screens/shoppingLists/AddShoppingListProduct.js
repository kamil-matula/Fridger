import React, { useState, useRef } from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import {
  ScrollViewLayout,
  AppBar,
  InputField,
  BottomSheet,
  SheetRow,
  FloatingActionButton,
} from 'components';
import { DeleteShoppingListProduct } from 'dialogs';
import { makeStyles, displayToast, convertToNumber } from 'utils';
import { deleteIcon, expand, check } from 'assets/icons';

import {
  useAddShoppingListProductMutation,
  useEditShoppingListProductMutation,
} from 'services/fridger/shoppingListProducts';

const AddShoppingListProduct = ({ route, navigation }) => {
  const styles = useStyles();
  const { mode } = route.params;
  const { product } = route.params;
  const listOfUnits = [
    { short: 'kg', long: 'kilograms' },
    { short: 'g', long: 'grams' },
    { short: 'l', long: 'liters' },
    { short: 'ml', long: 'milliliters' },
    { short: 'pcs', long: 'pieces' },
  ];

  const [addProductQuery, { isLoading: isAddProductLoading }] =
    useAddShoppingListProductMutation();
  const [editProductQuery, { isLoading: isEditProductLoading }] =
    useEditShoppingListProductMutation();

  // Form states:
  const { control, handleSubmit, setFocus, setValue, setError, watch } =
    useForm({
      defaultValues: {
        name: product?.name || '',
        quantity: product?.quantity || '',
        unit: product?.quantity_type || 'pcs',
        note: product?.note || '',
      },
    });
  const rules = {
    name: {
      required: 'Name is required',
      maxLength: {
        value: 25,
        message: 'Name cannot contain more than 25 characters',
      },
    },
    quantity: {
      required: 'Quantity is required',
    },
    unit: {
      required: 'Unit is required',
    },
  };

  const errorHandler = (error, text) => {
    const nameError = error.data?.name;
    const noteError = error.data?.note;
    const quantityError = error.data?.quantity;
    const quantityTypeError = error.data?.quantity_type;
    const nonFieldErrors = error.data?.non_field_errors;

    console.log(error);

    if (nameError) {
      setError('name', { type: 'server', message: nameError.join(' ') });
    }
    if (noteError) {
      setError('note', {
        type: 'server',
        message: noteError.join(' '),
      });
    }
    if (quantityError) {
      setError('quantity', {
        type: 'server',
        message: quantityError.join(' '),
      });
    }
    if (quantityTypeError) {
      setError('unit', {
        type: 'server',
        message: quantityTypeError.join(' '),
      });
    }
    if (!nameError && !noteError && !quantityError && !quantityTypeError) {
      displayToast(nonFieldErrors || text);
    }
  };

  // Bottom sheet with quantity types:
  const refBS = useRef(null);
  const showBottomSheet = () => {
    refBS.current.open();
  };

  // Quantity type:
  const unit = watch('unit');
  const changeUnit = (value) => {
    // Update state:
    setValue('unit', value);

    // Hide bottom sheet:
    refBS.current.close();
  };

  // Submitting form:
  const addProduct = (data) => {
    addProductQuery({
      shoppingList: route.params.shoppingListID,
      name: data.name,
      note: data.note,
      quantity: data.quantity,
      quantityType: data.unit,
    })
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        errorHandler(error, 'Unable to add product');
      });
  };
  const editProduct = (data) => {
    editProductQuery({
      productId: product.id,
      name: data.name,
      note: data.note,
      quantity: data.quantity,
      quantityType: data.unit,
    })
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        errorHandler(error, 'Unable to edit product');
      });
  };

  // Deleting product:
  const [deleteProductDialogVisible, setDeleteProductDialogVisible] =
    useState(false);

  return (
    <View style={styles.container}>
      {/* Screen title */}
      {mode === 'add' ? (
        <AppBar label='Add product' />
      ) : (
        <AppBar
          label='Edit product'
          icon1={deleteIcon}
          onPressIcon1={() => {
            // Show 'Delete Product' dialog:
            setDeleteProductDialogVisible(true);
          }}
        />
      )}

      {/* Providing data */}
      <ScrollViewLayout>
        <View>
          <InputField
            control={control}
            rules={rules.name}
            onSubmitEditing={() => setFocus('quantity')}
            name='name'
            label='Name'
            variant='data'
            returnKeyType='next'
            placeholder='Enter product name'
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 140 }}>
              <InputField
                control={control}
                rules={rules.quantity}
                onSubmitEditing={showBottomSheet}
                blurOnSubmit
                name='quantity'
                label='Quantity'
                keyboardType='numeric'
                variant='data'
                returnKeyType='next'
                placeholder='Enter quantity'
                onChangeText={convertToNumber}
              />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ width: 80 }}>
              <TouchableWithoutFeedback onPress={showBottomSheet}>
                <InputField
                  control={control}
                  rules={rules.unit}
                  value={watch('unit')}
                  name='unit'
                  label=' '
                  variant='data'
                  editable={false}
                  icon={expand}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <InputField
            control={control}
            name='note'
            label='Note (optional)'
            variant='data'
            returnKeyType='done'
            placeholder='Enter note'
          />
        </View>
      </ScrollViewLayout>

      {/* Quantity types */}
      <BottomSheet reference={refBS} title='Choose unit'>
        {listOfUnits.map((element) => (
          <SheetRow
            icon={unit === element.short ? check : null}
            key={element.long}
            text={element.long}
            onPress={() => changeUnit(element.short)}
          />
        ))}
      </BottomSheet>

      {/* Button at the bottom */}
      {mode === 'add' ? (
        <FloatingActionButton
          label='Add product'
          onPress={handleSubmit(addProduct)}
          centered
          isLoading={isAddProductLoading}
        />
      ) : (
        <FloatingActionButton
          label='Confirm'
          onPress={handleSubmit(editProduct)}
          centered
          confirm
          isLoading={isEditProductLoading}
        />
      )}

      {/* Deleting product */}
      <DeleteShoppingListProduct
        visible={deleteProductDialogVisible}
        setVisible={setDeleteProductDialogVisible}
        productID={product?.id}
        productName={product?.name}
        navigation={navigation}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default AddShoppingListProduct;
