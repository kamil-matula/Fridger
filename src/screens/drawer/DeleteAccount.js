import React, { useState, useRef } from 'react';

import { View } from 'react-native';

import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
} from '../../components';
import { makeStyles } from '../../utils';

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
      <ScrollViewLayout>
        <View>
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
          <Separator />
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
          <Separator height={32} />
        </View>
        <View>
          <Button
            label='delete account'
            variant='contained'
            color='red'
            onPress={deleteAccount}
          />
          <Separator />
        </View>
      </ScrollViewLayout>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default DeleteAccount;
