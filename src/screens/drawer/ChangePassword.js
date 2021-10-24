import React from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
} from 'components';
import { makeStyles } from 'utils';

const ChangePassword = ({ navigation }) => {
  const styles = useStyles();

  const { control, handleSubmit, setFocus, getValues } = useForm({
    defaultValues: {
      oldPassword: '',
      password: '',
      password2: '',
    },
  });

  const rules = {
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
  };

  const changePassword = (data) => {
    console.log('change password', data);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppBar label='change password' />
      <ScrollViewLayout>
        <View>
          <InputField
            control={control}
            rules={rules.password}
            onSubmitEditing={() => setFocus('password')}
            secure
            name='oldPassword'
            label='Old password'
            returnKeyType='next'
            placeholder='Enter your old password'
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.password}
            onSubmitEditing={() => setFocus('password2')}
            secure
            name='password'
            label='New password'
            returnKeyType='next'
            placeholder='Enter your new password'
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.password2}
            secure
            name='password2'
            label='Confirm new password'
            returnKeyType='next'
            placeholder='Confirm your new password'
          />
          <Separator height={32} />
        </View>
        <View>
          <Button
            label='Submit'
            variant='contained'
            onPress={handleSubmit(changePassword)}
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
}));

export default ChangePassword;
