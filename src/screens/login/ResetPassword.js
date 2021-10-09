import React, { useState, useRef } from 'react';

import { ScrollView, Text, View } from 'react-native';

import { InputField, Button } from '../../components';
import { makeStyles } from '../../utils/makeStyles';

const ResetPassword = () => {
  const styles = useStyles();

  const [email, setEmail] = useState('');

  const passwordRef = useRef();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Reset Password</Text>
        <Text style={styles.text}>Enter email associated with your account.{'\n'}We will send you a new password.</Text>
      </View>
      <InputField
        label='Email'
        textInputProps={{
          onChangeText: setEmail,
          value: email,
          returnKeyType: 'done',
          placeholder: 'Enter your email',
          autoComplete: 'email',
          keyboardType: 'email-address',
        }}
      />
      <View style={styles.separator40} />
      <Button label='Submit' variant='contained' />
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
  headerContainer: {
    marginVertical: 64,
  },
  header: {
    fontSize: 36,
    color: theme.colors.text,
    textAlign: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
  },
  separator40: {
    marginVertical: 20,
  },
}));

export default ResetPassword;
