import React, { useState } from 'react';

import { ScrollView, Text, View } from 'react-native';

import { InputField, Button, AppBar } from '../../components';
import { makeStyles, calculateSpace } from '../../utils';

const ResetPassword = ({ navigation }) => {
  const styles = useStyles();

  const [email, setEmail] = useState('');

  const resetPassword = () => {
    navigation.goBack();
  };

  // Calculating height of space between last input field and the button:
  const spaceHeight = calculateSpace({
    contentHeightTop: 240,
    inputFieldsAmount: 1,
    contentHeightBottom: 48 + 16,
    isAppBar: true,
  });

  return (
    <View style={styles.container}>
      <AppBar />
      <ScrollView style={styles.SVcontainer}>
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
        <View style={{ height: spaceHeight }} />
        <Button label='Submit' variant='contained' onPress={resetPassword} />
        <View style={styles.separator16} />
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
  separator16: {
    height: 16,
  },
}));

export default ResetPassword;
