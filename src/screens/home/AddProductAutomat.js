import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
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

const AddProductAutomat = ({ navigation }) => {
  const styles = useStyles();

  // Scanner states:
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Requesting camera permission on launch:
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Handling with data from barcode:
  const handleBarCodeScanned = ({ type, data }) => {
    // Update state:
    setScanned(true);

    // TODO: Send data to OpenFoodFacts API to retrieve information about product + update UI
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  // Form states:
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      expiration: '',
      quantity: '1',
    },
  });
  const rules = {
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

  // Date picker states:
  const [date, setDate] = useState(new Date());
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  const onDateChange = (event, selectedDate) => {
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

    // TODO: Make sure that it works on iOS devices
  };

  // Helper function for retrieving friendly date from datePicker:
  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  // Submitting form:
  const addProduct = (data) => {
    // TODO: Send request to API to add product to fridge
    console.log(`Product ${JSON.stringify(data)} added to fridge`);

    // Reset states:
    reset({
      quantity: '1',
      expiration: '',
    });

    // Go back:
    navigation.goBack();
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

      {/* TODO: Add possibility to request permissions once again by clicking the label */}
      {/* Scanning barcode */}
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

      {/* TODO: Display data from API instead of hardcoded one */}
      {/* Product data from API */}
      <ProductInfo
        text='Orzeszki ziemne smażone w chrupiącej posypce'
        subtext1='La Boulangère Bio'
        subtext2='500 g'
        nutri='A'
        nova='N1'
      />
      <Divider style={styles.divider} />

      {/* Providing data */}
      <ScrollViewLayout>
        <View>
          <Separator height={16} />
          <View style={{ width: '50%' }}>
            <InputField
              control={control}
              rules={rules.quantity}
              name='quantity'
              label='Quantity'
              keyboardType='numeric'
              variant='data'
              returnKeyType='done'
              textAlign='right'
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
              returnKeyType='next'
              placeholder='dd.MM.rrrr'
              icon={calendar}
              onIconPress={() => {
                // Display calendar:
                setDatepickerVisible(true);

                // TODO: Fix displaying calendar (Pixel 4a crashes here)
              }}
            />
          </View>
        </View>
        <Separator height={60} />
      </ScrollViewLayout>

      {/* Calendar */}
      {datepickerVisible && (
        <DateTimePicker value={date} mode='date' onChange={onDateChange} />
      )}

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
