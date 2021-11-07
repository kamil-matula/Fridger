import React, { useState, useRef, useEffect } from 'react';

import { View, Platform, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  InputField,
  ScrollViewLayout,
  AppBar,
  FloatingActionButton,
  ProductInfo,
  Separator,
  Button,
} from 'components';
import { makeStyles } from 'utils';
import { edit, calendar } from 'assets/icons';
import { Divider } from 'react-native-paper';

const AddProductAutomat = ({ navigation }) => {
  const styles = useStyles();

  // Scanner
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // Bottom Sheet
  const refBS = useRef(null);

  const showBottomSheet = () => {
    refBS.current.open();
  };

  // Form
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      expiration: '',
      quantity: '',
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
      quantity: '',
      expiration: '',
    });
  };

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={edit}
        onPressIcon1={() => {
          navigation.replace('AddProductManual');
        }}
      />
      <View style={styles.scannerContainer}>
        {hasPermission && (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
            <View style={styles.buttonContainer}>
              <Button
                label='scan again'
                variant='text'
                onPress={() => setScanned(false)}
              />
              <Text style={styles.text}>{scanned ? 'tap scan again' : ''}</Text>
            </View>
          </>
        )}
        {hasPermission === null && (
          <Text style={styles.accessText}>
            Requesting for camera permission
          </Text>
        )}
        {hasPermission === false && (
          <Text style={styles.accessText}>No access to camera</Text>
        )}
      </View>
      <ProductInfo
        text='Orzeszki ziemne smażone w chrupiącej posypce'
        subtext1='La Boulangère Bio'
        subtext2='500 g'
        nutri='A'
        nova='N1'
      />
      <Divider style={styles.divider} />
      <ScrollViewLayout>
        <View>
          <Separator height={16} />
          <View style={{ width: '50%' }}>
            <InputField
              control={control}
              rules={rules.expiration}
              onSubmitEditing={showBottomSheet}
              name='quantity'
              label='Quantity'
              keyboardType='numeric'
              variant='data'
              returnKeyType='done'
              placeholder='Enter quantity'
            />
          </View>
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
        <Separator height={60} />
      </ScrollViewLayout>
      {datepickerVisible && (
        <DateTimePicker value={date} mode='date' onChange={onChange} />
      )}
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
  scannerContainer: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.colors.richBlack,
  },
  scanner: {
    height: '100%',
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  text: {
    color: theme.colors.text,
  },
  accessText: {
    fontSize: 24,
    color: theme.colors.tartOrange,
  },

  divider: {
    backgroundColor: theme.colors.silverMetallic,
  },
}));

export default AddProductAutomat;
