import React, { useState, useRef } from 'react';

import { ScrollView, View } from 'react-native';

import { InputField, Button, AppBar } from '../../components';
import { makeStyles, calculateSpace } from '../../utils';

const DeleteAccount = ({ navigation }) => {
  const styles = useStyles();

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const repeatPasswordRef = useRef();

  const deleteAccount = () => {
    navigation.goBack();
  };

  // Calculating height of space between last input field and the button:
  const spaceHeight = calculateSpace({
    inputFieldsAmount: 2,
    contentHeightBottom: 48 + 16,
    isAppBar: true,
  });

  return (
    <View style={styles.container}>
      <AppBar label='Delete account' />
      <ScrollView style={styles.SVcontainer}>
        <InputField
          label='Password'
          secure={true}
          textInputProps={{
            onChangeText: setPassword,
            value: password,
            returnKeyType: 'next',
            placeholder: 'Enter your password',
            onSubmitEditing: () => repeatPasswordRef?.current?.focus(),
          }}
        />
        <View style={styles.separator16} />
        <InputField
          label='Confirm password'
          secure={true}
          textInputProps={{
            onChangeText: setRepeatPassword,
            value: repeatPassword,
            returnKeyType: 'done',
            placeholder: 'Confirm your password',
            ref: repeatPasswordRef,
          }}
        />
        <View style={{ height: spaceHeight }} />
        <Button
          label='delete account'
          variant='contained'
          color='red'
          onPress={deleteAccount}
        />
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  SVcontainer: {
    paddingHorizontal: 16,
  },
  separator16: {
    height: 16,
  },
}));

export default DeleteAccount;
