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
import { makeStyles, displayToast } from 'utils';
import { useDeleteAccountMutation } from 'services/fridger/user';
import { useLogoutMutation } from 'services/fridger/auth';

const DeleteAccount = () => {
  const styles = useStyles();

  // Queries:
  const [deleteAccountQuery, { isLoading }] = useDeleteAccountMutation();
  const [logout] = useLogoutMutation();

  // Form states:
  const { control, handleSubmit, setFocus, getValues, setError } = useForm({
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

  // Send data to api:
  const deleteAccount = (data) => {
    deleteAccountQuery(data)
      .unwrap()
      .then(() => logout())
      .catch((error) => {
        // Display error under specific input field...
        const currentPasswordError = error.data?.current_password;
        if (currentPasswordError) {
          setError('password', {
            type: 'server',
            message: currentPasswordError.join(' '),
          });
        }

        // ... or display toast if it's different kind of problem:
        else
          displayToast(
            error.data?.non_field_errors || 'Unable to delete account'
          );
      });
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
            returnKeyType='done'
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
            isLoading={isLoading}
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
