import React from 'react';

import { Text, View, ToastAndroid, AlertIOS, Platform } from 'react-native';
import { useForm } from 'react-hook-form';

import { InputField, Button, ScrollViewLayout, Separator } from 'components';
import { useLoginMutation } from 'services/fridger/auth';
import { makeStyles } from 'utils';

const Login = ({ navigation }) => {
  const styles = useStyles();

  const [loginPost, { isError, error }] = useLoginMutation();

  const { control, handleSubmit, setFocus } = useForm({
    defaultValues: {
      email: '',
      password: '',
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
    password: {
      required: 'Password is required',
    },
  };

  if (isError) {
    if (error.status === 400) {
      // Show toast:
      const message = error.data.non_field_errors.join(' ');
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        AlertIOS.alert(message);
      }

      // Additional debugging for cases if toast doesn't show up:
      console.log(message);
    }
  }

  return (
    <ScrollViewLayout>
      <View>
        <Text style={styles.header}>Login</Text>
        <InputField
          control={control}
          rules={rules.email}
          onSubmitEditing={() => setFocus('password')}
          name='email'
          label='Email'
          returnKeyType='next'
          placeholder='Enter your email'
          autoComplete='email'
          keyboardType='email-address'
        />
        <Separator />
        <InputField
          control={control}
          rules={rules.password}
          secure
          name='password'
          label='Password'
          returnKeyType='done'
          placeholder='Enter your password'
        />
        <View style={styles.resetPasswordContainer}>
          <Button
            label='Forgot password?'
            variant='pureText'
            onPress={() => navigation.navigate('ResetPassword')}
          />
        </View>
        <Separator height={32} />
      </View>

      <View>
        <Button
          label='Login'
          variant='contained'
          onPress={handleSubmit(loginPost)}
        />
        <Text style={styles.text}>Don’t have an account?</Text>
        <Button
          label='Register'
          variant='outlined'
          onPress={() => navigation.navigate('Register')}
        />
        <Separator />
      </View>
    </ScrollViewLayout>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    marginVertical: 64,
    fontSize: 36,
    color: theme.colors.white,
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
    color: theme.colors.white,
    textAlign: 'center',
  },
}));

export default Login;
