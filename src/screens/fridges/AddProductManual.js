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
import {
  makeStyles,
  displayToast,
  unitFromFrontToBack,
  dateFromFrontToBack,
} from 'utils';
import { scanner, calendar, expand, check } from 'assets/icons';
import { useAddFridgeProductMutation } from 'services/fridger/fridgeProducts';

const AddProductManual = ({ navigation, route }) => {
  const { fridgeID } = route.params;
  const styles = useStyles();
  const listOfUnits = [
    { short: 'kg', long: 'kilograms' },
    { short: 'g', long: 'grams' },
    { short: 'l', long: 'liters' },
    { short: 'ml', long: 'milliliters' },
    { short: 'pcs', long: 'pieces' },
  ];

  // Queries:
  const [addProductQuery, { isLoading }] = useAddFridgeProductMutation();

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
  const showBottomSheet = () => refBS.current.open();

  // Quantity type:
  const unit = watch('unit');
  const changeUnit = (value) => {
    setValue('unit', value);
    refBS.current.close();
  };

  // Date picker states:
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

  // Helper function for retrieving friendly date from datePicker:
  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  // Display calendar:
  const showDatepicker = () => setDatepickerVisible(true);

  // Submitting form:
  const addProduct = (data) => {
    // Prepare data for API:
    data.unit = unitFromFrontToBack(data.unit);
    data.expiration = dateFromFrontToBack(data.expiration);
    data.fridge = fridgeID;

    // Send request to API:
    addProductQuery(data)
      .unwrap()
      .then(() => {
        // Reset states and go back:
        reset({
          name: '',
          producer: '',
          expiration: '',
          quantity: '',
          unit: 'pcs',
        });
        navigation.goBack();
      })
      .catch((error) => {
        if (error.data?.name) displayToast('Invalid name of fridge');
        else
          displayToast(error.data?.non_field_errors || 'Unable to add fridge');
      });
  };

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={scanner}
        onPressIcon1={() => navigation.replace('AddProductAutomat')}
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
            name='producer'
            label='Producer (optional)'
            variant='data'
            returnKeyType='next'
            placeholder='Enter producer name'
          />
          <View style={{ width: '50%' }}>
            <InputField
              control={control}
              rules={rules.expiration}
              name='expiration'
              label='Expiration date (optional)'
              variant='data'
              icon={calendar}
              onIconPress={showDatepicker}
              returnKeyType='done'
              keyboardType='numeric'
              placeholder='dd.MM.rrrr'
            />
          </View>
        </View>
      </ScrollViewLayout>

      {/* Calendar */}
      {datepickerVisible && (
        <DateTimePicker value={date} mode='date' onChange={onDateChange} />
      )}

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
}));

export default AddProductManual;
