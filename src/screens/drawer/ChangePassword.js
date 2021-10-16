import React, { useState, useRef } from 'react';

import { ScrollView, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import { InputField, Button } from '../../components';
import { makeStyles } from '../../utils/makeStyles';

const ChangePassword = ({ navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const newPasswordRef = useRef();
  const repeatPasswordRef = useRef();

  const changePassword = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.AppbarHeader}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
          color={theme.colors.silverMetallic}
        />
        <Appbar.Content title='Change password' titleStyle={styles.AppbarTitleStyle} />
      </Appbar.Header>
      <ScrollView style={styles.SVcontainer}>
        <InputField
          label='Old password'
          secure={true}
          textInputProps={{
            onChangeText: setNewPassword,
            value: newPassword,
            returnKeyType: 'next',
            placeholder: 'Enter your old password',
            onSubmitEditing: () => newPasswordRef?.current?.focus(),
          }}
        />
        <View style={styles.separator16} />
        <InputField
          label='New password'
          secure={true}
          textInputProps={{
            onChangeText: setOldPassword,
            value: oldPassword,
            returnKeyType: 'next',
            placeholder: 'Enter your new password',
            onSubmitEditing: () => repeatPasswordRef?.current?.focus(),
            ref: newPasswordRef,
          }}
        />
        <View style={styles.separator16} />
        <InputField
          label='Confirm new password'
          secure={true}
          textInputProps={{
            onChangeText: setRepeatPassword,
            value: repeatPassword,
            returnKeyType: 'done',
            placeholder: 'Confirm your new password',
            ref: repeatPasswordRef,
          }}
        />
        <View style={styles.separator40} />
        <Button label='Submit' variant='contained' onPress={changePassword} />
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  AppbarHeader: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  AppbarTitleStyle: {
    color: theme.colors.text,
    textTransform: 'capitalize',
  },
  SVcontainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  separator16: {
    marginVertical: 8,
  },
  separator40: {
    marginVertical: 20,
  },
}));

export default ChangePassword;
