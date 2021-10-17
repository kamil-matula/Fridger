import React, { useState, useRef } from 'react';

import { ScrollView, View } from 'react-native';

import { InputField, Button, AppBar } from '../../components';
import { makeStyles } from '../../utils/makeStyles';

const DeleteAccount = ({ navigation }) => {
  const styles = useStyles();

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const repeatPasswordRef = useRef();

  const deleteAccount = () => {
    navigation.goBack();
  };

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
        <View style={styles.separator40} />
        <Button label='delete account' variant='containedRed' onPress={deleteAccount} />
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
    paddingBottom: 16,
  },
  separator16: {
    marginVertical: 8,
  },
  separator40: {
    marginVertical: 20,
  },
}));

export default DeleteAccount;
