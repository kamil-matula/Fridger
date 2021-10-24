import React from 'react';

import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
} from 'components';
import { makeStyles } from 'utils';

const ResetPassword = ({ navigation }) => {
  const styles = useStyles();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const rules = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Invalid email's format",
      },
    },
  };

  const resetPassword = (data) => {
    console.log('reset password', data);
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
            control={control}
            rules={rules.email}
            name='email'
            label='Email'
            returnKeyType='done'
            placeholder='Enter your email'
            autoComplete='email'
            keyboardType='email-address'
          />
          <Separator height={32} />
        </View>
        <View>
          <Button
            label='Submit'
            variant='contained'
            onPress={handleSubmit(resetPassword)}
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
