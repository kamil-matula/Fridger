import React, { useState, useRef } from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  InputField,
  ScrollViewLayout,
  AppBar,
  BottomSheet,
  SheetRow,
  FloatingActionButton,
  DatePicker,
} from 'components';
import { makeStyles, displayToast, convertToNumber, listOfUnits } from 'utils';
import { scanner, calendar, expand, check } from 'assets/icons';
import { useAddFridgeProductMutation } from 'services/fridger/fridgeProducts';

const AddProductManual = ({ navigation, route }) => {
  const { fridgeID } = route.params;
  const styles = useStyles();

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

  // Calendar states:
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  // Submitting form:
  const addProduct = (data) => {
    data.fridge = fridgeID;
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
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to add product')
      );
  };

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={scanner}
        onPressIcon1={() =>
          navigation.replace('AddProductAutomat', { fridgeID })
        }
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
            maxLength={25}
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
              <InputField
                control={control}
                rules={rules.unit}
                name='unit'
                label=' '
                variant='data'
                editable={false}
                icon={expand}
                onInputFieldPress={showBottomSheet}
              />
            </View>
          </View>
          <InputField
            control={control}
            name='producer'
            label='Producer (optional)'
            variant='data'
            returnKeyType='next'
            placeholder='Enter producer name'
            maxLength={25}
          />
          <InputField
            control={control}
            rules={rules.expiration}
            name='expiration'
            label='Expiration date (optional)'
            variant='data'
            icon={calendar}
            onInputFieldPress={() => setDatepickerVisible(true)}
            placeholder='dd.MM.rrrr'
            inputFieldWith={140}
            editable={false}
          />
        </View>
      </ScrollViewLayout>

      {/* Calendar */}
      <DatePicker
        setExpirationDate={(value) => setValue('expiration', value)}
        visible={datepickerVisible}
        setVisible={setDatepickerVisible}
      />

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
