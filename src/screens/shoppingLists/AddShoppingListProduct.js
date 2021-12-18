import React, { useState, useRef } from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  ScrollViewLayout,
  AppBar,
  InputField,
  BottomSheet,
  SheetRow,
  FloatingActionButton,
  Dialog,
} from 'components';
import { makeStyles, displayToast } from 'utils';
import { deleteIcon, expand, check } from 'assets/icons';
import { unitFromFrontToBack, unitFromBackToFront } from 'utils/dataConverting';

import {
  useAddShoppingListProductMutation,
  useEditShoppingListProductMutation,
  useDeleteShoppingListProductMutation,
} from 'services/fridger/shoppingListProducts';

const AddShoppingListProduct = ({ route, navigation }) => {
  const styles = useStyles();
  const { mode } = route.params;
  const { product } = route.params;

  const addProductQuery = useAddShoppingListProductMutation()[0];
  const editProductQuery = useEditShoppingListProductMutation()[0];
  const deleteProductQuery = useDeleteShoppingListProductMutation()[0];

  // Form states:
  const { control, handleSubmit, setFocus, setValue, setError, watch } =
    useForm({
      defaultValues: {
        name: product?.name || '',
        quantity: product?.quantity.toString() || '',
        unit: product?.quantity_type
          ? unitFromBackToFront(product?.quantity_type)
          : 'pcs',
        note: product?.note || '',
      },
    });
  const rules = {
    name: {
      required: 'Name is required',
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
    if (nonFieldErrors) {
      displayToast(nonFieldErrors.join(' '));
    }
    if (
      !nameError &&
      !noteError &&
      !quantityError &&
      !quantityTypeError &&
      !nonFieldErrors
    ) {
      displayToast(text);
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
      quantityType: unitFromFrontToBack(data.unit),
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
      quantityType: unitFromFrontToBack(data.unit),
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
  const confirmRemoveProduct = () => {
    deleteProductQuery({ id: product.id })
      .unwrap()
      .then(() => {
        setDeleteProductDialogVisible(false);
        navigation.goBack();
      })
      .catch((error) => {
        errorHandler(error, 'Unable to delete product');
      });
  };
  const cancelRemoveProduct = () => setDeleteProductDialogVisible(false);

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
            <View style={{ width: '50%' }}>
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
              />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ width: '30%' }}>
              <InputField
                control={control}
                rules={rules.unit}
                value={watch('unit')}
                name='unit'
                variant='data'
                editable={false}
                icon={expand}
                onIconPress={showBottomSheet}
              />
            </View>
          </View>

          {/* TODO: Increase height to 2-3 lines instead of one,
              text-wrapping and limit of characters */}
          <InputField
            control={control}
            name='note'
            label='Note'
            variant='data'
            returnKeyType='done'
            placeholder='Enter note'
          />
        </View>
      </ScrollViewLayout>

      {/* Quantity types */}
      <BottomSheet reference={refBS} title='Choose unit'>
        <SheetRow
          icon={unit === 'kg' ? check : null}
          text='kilograms'
          onPress={() => {
            changeUnit('kg');
          }}
        />
        <SheetRow
          icon={unit === 'g' ? check : null}
          text='grams'
          onPress={() => {
            changeUnit('g');
          }}
        />
        <SheetRow
          icon={unit === 'l' ? check : null}
          text='liters'
          onPress={() => {
            changeUnit('l');
          }}
        />
        <SheetRow
          icon={unit === 'ml' ? check : null}
          text='milliliters'
          onPress={() => {
            changeUnit('ml');
          }}
        />
        <SheetRow
          icon={unit === 'pcs' ? check : null}
          text='pieces'
          onPress={() => {
            changeUnit('pcs');
          }}
        />
      </BottomSheet>

      {/* Button at the bottom */}
      {mode === 'add' ? (
        <FloatingActionButton
          label='Add product'
          onPress={handleSubmit(addProduct)}
          centered
        />
      ) : (
        <FloatingActionButton
          label='Confirm'
          onPress={handleSubmit(editProduct)}
          centered
          confirm
        />
      )}

      {/* Deleting product */}
      <Dialog
        title='Delete product'
        paragraph={`Are you sure you want to delete ${product?.name} from this shopping list? This action cannot be undone.`}
        visibilityState={[
          deleteProductDialogVisible,
          setDeleteProductDialogVisible,
        ]}
        label1='delete'
        onPressLabel1={confirmRemoveProduct}
        label2='cancel'
        onPressLabel2={cancelRemoveProduct}
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
