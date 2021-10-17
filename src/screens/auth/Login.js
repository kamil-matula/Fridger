import React, { useState, useRef } from 'react';

import { ScrollView, Text, View } from 'react-native';

import { InputField, Button } from '../../components';
import { makeStyles, calculateSpace } from '../../utils';

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

  // Calculating height of space between last input field and the button:
  const spaceHeight = calculateSpace({
    contentHeightTop: 176,
    inputFieldsAmount: 2,
    contentHeightBottom: 24 + 48 + 51 + 48 + 16,
  });

  return (
    <ScrollView style={styles.container}>
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
      <View style={{ height: spaceHeight }} />
      <Button label='Login' variant='contained' onPress={login} />
      <Text style={styles.text}>Don’t have an account?</Text>
      <Button
        label='Register'
        variant='outlined'
        onPress={() => navigation.navigate('Register')}
      />
      <View style={styles.separator16} />
    </ScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
  },
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
  separator16: {
    height: 16,
  },
}));

export default Login;
