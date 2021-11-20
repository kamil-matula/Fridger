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
import { makeStyles } from 'utils';
import { deleteIcon, expand, check } from 'assets/icons';
import { shoppingListItems } from 'tmpData';

const AddShoppingListProduct = ({ route, navigation }) => {
  const styles = useStyles();

  // Product identifying:
  const product = route.params
    ? shoppingListItems.find((e) => e.id === route.params.productID)
    : null;
  const mode = product ? 'edit' : 'add';

  // Form states:
  const { control, handleSubmit, setFocus, setValue, reset, watch } = useForm({
    defaultValues: {
      name: product ? product.name : '',
      quantity: product ? product.quantity.toString() : '',
      unit: product ? product.unit : 'pcs',
      note: product ? product.note ?? '' : '',
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
    // TODO: Send request to API to add product to shopping list
    console.log(`Product ${JSON.stringify(data)} added to shopping list`);

    // Reset states:
    reset({
      name: '',
      producer: '',
      quantity: '',
      unit: 'pcs',
    });

    // Go back:
    navigation.goBack();
  };
  const editProduct = (data) => {
    // TODO: Send request to API to edit shopping list's product
    console.log(`Product has been changed to ${JSON.stringify(data)}`);

    // Reset states:
    reset({
      name: '',
      producer: '',
      quantity: '',
      unit: 'pcs',
    });

    // Go back:
    navigation.goBack();
  };

  // Deleting product:
  const [deleteProductDialogVisible, setDeleteProductDialogVisible] =
    useState(false);
  const confirmRemoveProduct = () => {
    // TODO: Send request to API and wait for removing fridge from the list

    // Hide dialog and go back:
    setDeleteProductDialogVisible(false);
    navigation.pop();
  };
  const cancelRemoveProduct = () => {
    // Hide dialog:
    setDeleteProductDialogVisible(false);
  };

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
        paragraph={`Are you sure you want to delete ${product.name} from this shopping list? This action cannot be undone.`}
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
