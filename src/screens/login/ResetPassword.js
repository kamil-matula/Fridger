import React, { useState } from 'react';

import { ScrollView, Text, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import { InputField, Button } from '../../components';
import { makeStyles } from '../../utils/makeStyles';

const ResetPassword = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const [email, setEmail] = useState('');

  const resetPassword = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.AppbarHeader}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color={theme.colors.silverMetallic}
        />
      </Appbar.Header>
      <ScrollView style={styles.SVcontainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Reset Password</Text>
          <Text style={styles.text}>
            Enter email associated with your account.{'\n'}We will send you a new password.
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
        <View style={styles.separator40} />
        <Button label='Submit' variant='contained' onPress={resetPassword} />
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  AppbarHeader: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  SVcontainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
