import React, { useState } from 'react';

import { Text, View } from 'react-native';

import { InputField, Button, AppBar, ScrollViewLayout } from '../../components';
import { makeStyles } from '../../utils';

const ResetPassword = ({ navigation }) => {
  const styles = useStyles();

  const [email, setEmail] = useState('');

  const resetPassword = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <ScrollViewLayout>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Reset Password</Text>
            <Text style={styles.text}>
              Enter email associated with your account.{'\n'}We will send you a
              new password.
            </Text>
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
          <View style={styles.separator32} />
        </View>
        <View>
          <Button label='Submit' variant='contained' onPress={resetPassword} />
          <View style={styles.separator16} />
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
}));

export default ResetPassword;
