import React from 'react';

import { Text, View, ToastAndroid, AlertIOS, Platform } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
} from 'components';
import { makeStyles } from 'utils';
import { useResetPasswordMutation } from 'services/fridger/auth';

const ResetPassword = ({ navigation }) => {
  const styles = useStyles();

  const resetPasswordPost = useResetPasswordMutation()[0];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const rules = {
    email: {
      required: 'Email is required',
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email format',
      },
    },
  };

  const resetPassword = (data) => {
    resetPasswordPost(data)
      .unwrap()
      .then(() => {
        navigation.goBack();
        const message = 'Email has been sent with the link.';
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
          AlertIOS.alert(message);
        }
      })
      .catch((error) => {
        // There shoudln't be any error. Even if email doesn't exists in api, we don't
        // give this info everytime we should have HTTP 204 no content.
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <AppBar />
      <ScrollViewLayout>
        {/* Input field with header */}
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Reset Password</Text>
            <Text style={styles.text}>
              Enter email associated with your account.{'\n'}We will send you a
              link to reset password.
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

        {/* Button */}
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
    color: theme.colors.white,
    textAlign: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: theme.colors.white,
    textAlign: 'center',
  },
}));

export default ResetPassword;
