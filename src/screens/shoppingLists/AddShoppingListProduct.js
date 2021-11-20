import React, { useRef } from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  ScrollViewLayout,
  AppBar,
  InputField,
  BottomSheet,
  SheetRow,
  FloatingActionButton,
} from 'components';
import { makeStyles } from 'utils';
import { deleteIcon, expand, check } from 'assets/icons';

const AddShoppingListProduct = ({ navigation }) => {
  const styles = useStyles();

  // Form states:
  const { control, handleSubmit, setFocus, setValue, reset, watch } = useForm({
    defaultValues: {
      name: '',
      quantity: '',
      unit: 'pcs',
      note: '',
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
    // TODO: Send request to API to add product to fridge
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

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={deleteIcon}
        onPressIcon1={
          () => {}
          // TODO: remove product
        }
      />
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
          <InputField
            control={control}
            rules={rules.producer}
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
}));

export default AddShoppingListProduct;
