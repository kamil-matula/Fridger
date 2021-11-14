import React from 'react';

import { Text, View, ToastAndroid, AlertIOS, Platform } from 'react-native';
import { useForm } from 'react-hook-form';

import { InputField, Button, ScrollViewLayout, Separator } from 'components';
import { makeStyles } from 'utils';
import { useRegisterMutation } from 'services/fridger/auth';

const Register = ({ navigation }) => {
  const styles = useStyles();
  const registerPost = useRegisterMutation()[0];

  const { control, handleSubmit, setFocus, getValues, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password2: '',
      username: '',
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
      minLength: {
        value: 8,
        message: 'Password must contain at least 8 characters',
      },
    },
    password2: {
      validate: (password2) =>
        getValues('password') === password2 || "Passwords don't match",
    },
    username: {
      required: 'Username is required',
    },
  };

  const handleRegister = ({ email, username, password }) => {
    registerPost({ email, username, password })
      .unwrap()
      .then(() =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'RegisterFeedback' }],
        })
      )
      .catch((error) => {
        const usernameError = error.data?.username;
        const emailError = error.data?.email;
        const passwordError = error.data?.password;
        const generalError = error.data?.non_field_errors;
        if (emailError) {
          setError('email', { type: 'server', message: emailError.join(' ') });
        }
        if (usernameError) {
          setError('username', {
            type: 'server',
            message: usernameError.join(' '),
          });
        }
        if (passwordError) {
          setError('password', {
            type: 'server',
            message: passwordError.join(' '),
          });
        }
        if (generalError) {
          const message = generalError.join(' ');
          if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            AlertIOS.alert(message);
          }
        }
      });
  };
  return (
    <ScrollViewLayout>
      <View>
        <Text style={styles.header}>Register</Text>
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
          onSubmitEditing={() => setFocus('password2')}
          secure
          name='password'
          label='Password'
          returnKeyType='next'
          placeholder='Enter your password'
        />
        <Separator />
        <InputField
          control={control}
          rules={rules.password2}
          onSubmitEditing={() => setFocus('username')}
          secure
          name='password2'
          label='Confirm password'
          returnKeyType='next'
          placeholder='Confirm your password'
        />
        <Separator />
        <InputField
          control={control}
          rules={rules.username}
          label='Username'
          name='username'
          returnKeyType='done'
          placeholder='Enter your username'
        />
        <Separator height={32} />
      </View>

      {/* Buttons */}
      <View>
        <Button
          label='Register'
          variant='contained'
          onPress={handleSubmit(handleRegister)}
        />
        <Text style={styles.text}>Already have an account?</Text>
        <Button
          label='Login'
          variant='outlined'
          onPress={() => navigation.goBack()}
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
  text: {
    marginVertical: 16,
    fontSize: 14,
    color: theme.colors.white,
    textAlign: 'center',
  },
}));

export default Register;
