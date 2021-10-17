import React, { useState, useRef } from 'react';

import { Text, View } from 'react-native';

import { InputField, Button, ScrollViewLayout } from '../../components';
import { makeStyles } from '../../utils';

const Register = ({ navigation }) => {
  const styles = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nick, setNick] = useState('');

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nickRef = useRef();

  const register = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterFeedback' }],
    });
  };

  return (
    <ScrollViewLayout>
      <View>
        <Text style={styles.header}>Register</Text>
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
            returnKeyType: 'next',
            placeholder: 'Enter your password',
            onSubmitEditing: () => confirmPasswordRef?.current?.focus(),
            ref: passwordRef,
          }}
          secure={true}
        />
        <View style={styles.separator16} />
        <InputField
          label='Confirm password'
          textInputProps={{
            onChangeText: setConfirmPassword,
            value: confirmPassword,
            returnKeyType: 'next',
            placeholder: 'Confirm your password',
            onSubmitEditing: () => nickRef?.current?.focus(),
            ref: confirmPasswordRef,
          }}
          secure={true}
        />
        <View style={styles.separator16} />
        <InputField
          label='Nick'
          textInputProps={{
            onChangeText: setNick,
            value: nick,
            returnKeyType: 'done',
            placeholder: 'Enter your nick',
            ref: nickRef,
          }}
        />
        <View style={styles.separator32} />
      </View>
      <View>
        <Button label='Register' variant='contained' onPress={register} />
        <Text style={styles.text}>Already have an account?</Text>
        <Button
          label='Login'
          variant='outlined'
          onPress={() => navigation.goBack()}
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
  text: {
    marginVertical: 16,
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
}));

export default Register;
