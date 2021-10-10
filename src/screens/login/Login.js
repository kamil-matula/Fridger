import React, { useState, useRef } from 'react';

import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { InputField, Button } from '../../components';
import { makeStyles } from '../../utils/makeStyles';

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
        <Button label='Forgot password?' variant='pureText' onPress={() => navigation.navigate('ResetPassword')} />
      </View>
      <View style={styles.separator40} />
      <Button label='Login' variant='contained' onPress={login} />
      <Text style={styles.text}>Don’t have an account?</Text>
      <Button label='Sign up' variant='outlined' onPress={() => navigation.navigate('SignUp')} />
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
    marginVertical: 8,
  },
  separator40: {
    marginVertical: 20,
  },
}));

export default Login;
