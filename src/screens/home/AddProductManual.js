import React, { useState, useRef } from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  InputField,
  ScrollViewLayout,
  AppBar,
  BottomSheet,
  SheetRow,
  FloatingActionButton,
} from 'components';
import { makeStyles } from 'utils';
import { scanner, calendar, expand, check } from 'assets/icons';

const AddProductManual = ({ navigation }) => {
  const styles = useStyles();

  // Form states:
  const { control, handleSubmit, setFocus, setValue, reset, watch } = useForm({
    defaultValues: {
      name: '',
      producer: '',
      expiration: '',
      quantity: '',
      unit: 'pcs',
    },
  });
  const rules = {
    name: {
      required: 'Name is required',
    },
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

  // Date picker states:
  const [date, setDate] = useState(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    // Retrieve date:
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setValue('expiration', dateToString(currentDate));

    // Hide calendar:
    setDatepickerVisible(false);

    // TODO: Make sure that it works on iOS devices
  };

  // Helper function for retrieving friendly date from datePicker:
  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  // Display calendar:
  const showDatepicker = () => {
    setDatepickerVisible(true);
  };

  // Submitting form:
  const addProduct = (data) => {
    // TODO: Send request to API to add product to fridge
    console.log(`Product ${JSON.stringify(data)} added to fridge`);

    // Reset states:
    reset({
      name: '',
      producer: '',
      expiration: '',
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
        icon1={scanner}
        onPressIcon1={() => {
          navigation.replace('AddProductAutomat');
        }}
      />

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
                rules={rules.expiration}
                onSubmitEditing={showBottomSheet}
                blurOnSubmit
                name='quantity'
                label='Quantity'
                keyboardType='numeric'
                variant='data'
                returnKeyType='done'
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
            name='producer'
            label='Producer'
            variant='data'
            returnKeyType='next'
            placeholder='Enter producer name'
          />
          <View style={{ width: '50%' }}>
            <InputField
              control={control}
              rules={rules.expiration}
              name='expiration'
              label='Expiration date'
              variant='data'
              editable={false}
              icon={calendar}
              onIconPress={showDatepicker}
              returnKeyType='next'
              placeholder='dd.MM.rrrr'
            />
          </View>
        </View>
      </ScrollViewLayout>

      {/* Calendar */}
      {datepickerVisible && (
        <DateTimePicker value={date} mode='date' onChange={onChange} />
      )}

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
        onPress={() => {
          // TODO: Fix executing the method below:
          handleSubmit(addProduct);
        }}
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

export default AddProductManual;
