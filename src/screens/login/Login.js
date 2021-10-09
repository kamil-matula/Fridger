import React, { useState, useRef } from 'react';

import { ScrollView, Text, View } from 'react-native';

import { InputField, Button } from '../../components';
import { makeStyles } from '../../utils/makeStyles';

const Login = () => {
  const styles = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <InputField
        label='Email'
        placeholder='Enter your email'
        textState={[email, setEmail]}
        reference={[emailRef, passwordRef]}
        returnKeyType='next'
      />
      <View style={styles.separator16} />
      <InputField
        label='Password'
        placeholder='Enter your password'
        textState={[password, setPassword]}
        reference={[passwordRef, null]}
        returnKeyType='done'
        secure={true}
      />
      <View style={styles.separator40} />
      <Button label='Login' variant='contained' />
      <Text style={styles.text}>Don’t have an account?</Text>
      <Button label='Sign up' variant='outlined' />
    </ScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.background,
  },
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
  separator16: {
    marginVertical: 8,
  },
  separator40: {
    marginVertical: 20,
  },
}));

export default Login;
