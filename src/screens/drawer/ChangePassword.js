import React from 'react';

import { View, AlertIOS, Platform } from 'react-native';
import { useForm } from 'react-hook-form';

import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
} from 'components';
import { makeStyles } from 'utils';

import { useChangePasswordMutation } from 'services/fridger/user';

const ChangePassword = ({ navigation }) => {
  const styles = useStyles();

  // Queries:
  const [changePasswordQuery, { isLoading }] = useChangePasswordMutation();

  // Form states:
  const { control, handleSubmit, setFocus, getValues, setError } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPassword2: '',
    },
  });

  const rules = {
    newPassword: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must contain at least 8 characters',
      },
    },
    newPassword2: {
      validate: (newPassword2) =>
        getValues('newPassword') === newPassword2 || "Passwords don't match",
    },
  };

  // Send data to api:
  const changePassword = (data) => {
    changePasswordQuery(data)
      .unwrap()
      .then(() => navigation.goBack())
      .catch((error) => {
        // Display error under specific input field...
        const currentPasswordError = error.data?.current_password;
        const newPasswordError = error.data?.new_password;
        if (currentPasswordError) {
          setError('currentPassword', {
            type: 'server',
            message: currentPasswordError.join(' '),
          });
        }
        if (newPasswordError) {
          setError('newPassword', {
            type: 'server',
            message: newPasswordError.join(' '),
          });
        }

        // ... or display toast if it's different kind of problem:
        const generalError = error.data?.non_field_errors;
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
    <View style={styles.container}>
      <AppBar label='change password' />
      <ScrollViewLayout>
        {/* Input fields */}
        <View>
          <InputField
            control={control}
            onSubmitEditing={() => setFocus('newPassword')}
            secure
            name='currentPassword'
            label='Current password'
            returnKeyType='next'
            placeholder='Enter your old password'
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.newPassword}
            onSubmitEditing={() => setFocus('newPassword2')}
            secure
            name='newPassword'
            label='New password'
            returnKeyType='next'
            placeholder='Enter your new password'
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.newPassword2}
            secure
            name='newPassword2'
            label='Confirm new password'
            returnKeyType='done'
            placeholder='Confirm your new password'
          />
          <Separator height={32} />
        </View>

        {/* Button */}
        <View>
          <Button
            label='Submit'
            variant='contained'
            onPress={handleSubmit(changePassword)}
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

export default ChangePassword;
