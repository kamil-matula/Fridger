import React from 'react';

import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';

import { InputField, Button, ScrollViewLayout, Separator } from 'components';
import { useLoginMutation } from 'services/fridger/auth';
import { displayToast, makeStyles } from 'utils';

const Login = ({ navigation }) => {
  const styles = useStyles();

  // Queries:
  const [loginPost, { isLoading }] = useLoginMutation();

  // Form states:
  const { control, handleSubmit, setFocus } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form rules:
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

  // Send data to api:
  const login = (data) => {
    loginPost(data)
      .unwrap()
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to login')
      );
  };

  return (
    <ScrollViewLayout>
      <View>
        <Text style={styles.header}>Login</Text>

        {/* Providing data */}
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

      {/* Buttons */}
      <View>
        <Button
          label='Login'
          variant='contained'
          onPress={handleSubmit(login)}
          isLoading={isLoading}
        />
        <Text style={styles.text}>Don&apos;t have an account?</Text>
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
