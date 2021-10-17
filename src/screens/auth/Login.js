import React, { useState, useRef } from 'react';

import { Text, View } from 'react-native';

import { InputField, Button, ScrollViewLayout } from '../../components';
import { makeStyles } from '../../utils';

const Login = ({ navigation }) => {
  const styles = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  const login = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'DrawerNavigator' }],
    });
  };

  return (
    <ScrollViewLayout>
      <View>
        <Text style={styles.header}>Login</Text>
        <InputField
          label='Email'
          textInputProps={{
            onChangeText: setEmail,
            value: email,
            returnKeyType: 'next',
            placeholder: 'Enter your email',
            onSubmitEditing: () => passwordRef?.current?.focus(),
            autoComplete: 'email',
            keyboardType: 'email-address',
          }}
        />
        <View style={styles.separator16} />
        <InputField
          label='Password'
          textInputProps={{
            onChangeText: setPassword,
            value: password,
            returnKeyType: 'done',
            placeholder: 'Enter your password',
            onSubmitEditing: login,
            ref: passwordRef,
          }}
          secure={true}
        />
        <View style={styles.resetPasswordContainer}>
          <Button
            label='Forgot password?'
            variant='pureText'
            onPress={() => navigation.navigate('ResetPassword')}
          />
        </View>
        <View style={styles.separator32} />
      </View>
      <View>
        <Button label='Login' variant='contained' onPress={login} />
        <Text style={styles.text}>Don’t have an account?</Text>
        <Button
          label='Register'
          variant='outlined'
          onPress={() => navigation.navigate('Register')}
        />
        <View style={styles.separator16} />
      </View>
    </ScrollViewLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    marginVertical: 64,
    fontSize: 36,
    color: theme.colors.text,
    textAlign: 'center',
  },
  resetPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  resetPassword: {
    color: theme.colors.blueJeans,
  },
  text: {
    marginVertical: 16,
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
}));

export default Login;
