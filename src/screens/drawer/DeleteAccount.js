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

const DeleteAccount = ({ navigation }) => {
  const styles = useStyles();

  const { control, handleSubmit, setFocus, getValues } = useForm({
    defaultValues: {
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

  const deleteAccount = (data) => {
    // TODO: Send request to API to delete account
    console.log('delete account', data);

    // Go back to Home Page:
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppBar label='Delete account' />
      <ScrollViewLayout>
        {/* Input fields */}
        <View>
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
            secure
            name='password2'
            label='Confirm password'
            returnKeyType='next'
            placeholder='Confirm your password'
          />
          <Separator height={32} />
        </View>

        {/* Button */}
        <View>
          <Button
            label='delete account'
            variant='contained'
            color='red'
            onPress={handleSubmit(deleteAccount)}
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

export default DeleteAccount;
