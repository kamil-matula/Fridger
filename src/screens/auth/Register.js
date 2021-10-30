import React from 'react';

import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';

import { InputField, Button, ScrollViewLayout, Separator } from 'components';
import { makeStyles } from 'utils';

const Register = ({ navigation }) => {
  const styles = useStyles();

  const { control, handleSubmit, setFocus, getValues } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password2: '',
      nick: '',
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
    nick: {
      required: 'Nick is required',
    },
  };

  const register = (data) => {
    console.log('register', data);
    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterFeedback' }],
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
          onSubmitEditing={() => setFocus('nick')}
          secure
          name='password2'
          label='Confirm password'
          returnKeyType='next'
          placeholder='Confirm your password'
        />
        <Separator />
        <InputField
          control={control}
          rules={rules.nick}
          label='Nick'
          name='nick'
          returnKeyType='done'
          placeholder='Enter your nick'
        />
        <Separator height={32} />
      </View>
      <View>
        <Button
          label='Register'
          variant='contained'
          onPress={handleSubmit(register)}
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
    color: theme.colors.text,
    textAlign: 'center',
  },
  text: {
    marginVertical: 16,
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
}));

export default Register;
