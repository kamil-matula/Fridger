import React, { useEffect } from 'react';

import { TextInput } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import { makeStyles, displayToast } from 'utils';
import { back, more } from 'assets/icons';

const AppBarRenamer = ({
  label = '',
  onPressIcon = null,
  query,
  confirmMessage,
  errorMessage,
  containerID,
}) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation = useNavigation();

  // AppBar states:
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      label,
    },
  });
  const submit = (data) => editName(data);

  // Update label when data is fetched:
  useEffect(() => {
    setValue('label', label);
  }, [label]);

  // Send request to API:
  const editName = (name) => {
    query({ id: containerID, name })
      .unwrap()
      .then(() => displayToast(confirmMessage))
      .catch((error) => {
        if (error.data?.name) displayToast('Invalid name');
        else displayToast(error.data?.non_field_errors || errorMessage);

        // Rebuild appbar:
        setValue('label', label);
      });
  };

  return (
    <Appbar.Header style={styles.bar}>
      <Appbar.Action
        icon={back}
        onPress={() => navigation.goBack()}
        color={colors.silverMetallic}
      />

      {/* Name of current page / input field responsible for changing name */}
      <Controller
        control={control}
        name='label'
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.title}
            value={value}
            onChangeText={onChange}
            returnKeyType='done'
            onEndEditing={() => handleSubmit(submit(value))}
            maxLength={25}
          />
        )}
      />

      {/* Additional actions */}
      <Appbar.Action
        icon={more}
        color={colors.silverMetallic}
        onPress={onPressIcon}
      />
    </Appbar.Header>
  );
};

AppBarRenamer.propTypes = {
  label: PropTypes.string,
  onPressIcon: PropTypes.func.isRequired,
  query: PropTypes.func.isRequired,
  confirmMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  containerID: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  bar: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  title: {
    flex: 1,
    marginLeft: 32,
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.white,
  },
}));

export default AppBarRenamer;
