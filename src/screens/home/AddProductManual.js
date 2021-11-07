import React, { useState, useRef } from 'react';

import { View, Platform } from 'react-native';
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

  // Bottom Sheet
  const refBS = useRef(null);

  const showBottomSheet = () => {
    refBS.current.open();
  };

  // Form
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

  const unit = watch('unit');

  const changeUnit = (value) => {
    setValue('unit', value);
    refBS.current.close();
  };

  // Date picker
  const [date, setDate] = useState(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatepickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
    setValue('expiration', dateToString(currentDate));
  };

  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  const showDatepicker = () => {
    setDatepickerVisible(true);
  };

  // Submit
  // eslint-disable-next-line no-unused-vars
  const addProduct = (data) => {
    // TODO: Add product to fridge
    reset({
      name: '',
      producer: '',
      expiration: '',
      quantity: '',
      unit: 'pcs',
    });
  };

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={scanner}
        onPressIcon1={() => {
          navigation.navigate('AddProductAutomat');
        }}
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
      {datepickerVisible && (
        <DateTimePicker value={date} mode='date' onChange={onChange} />
      )}
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
      <FloatingActionButton
        label='Add product'
        onPress={() => {
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
