import React, { useEffect } from 'react';

import { TextInput } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

import { back, drawer } from 'assets/icons';
import { makeStyles } from 'utils';

const AppBar = ({
  label = '',
  isDrawer = false,
  icon1 = null,
  onPressIcon1 = null,
  icon2 = null,
  onPressIcon2 = null,
  editable = false,
  onSubmitEditing = null,
}) => {
  const styles = useStyles(editable);
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Editing fridge / shopping list's name:
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      label,
    },
  });
  const submit = (data) => {
    // Update name:
    onSubmitEditing(data);
  };

  // Update label when data is fetched:
  useEffect(() => {
    setValue('label', label);
  }, [label]);

  return (
    <Appbar.Header style={styles.bar}>
      {/* Opening drawer or going back */}
      {isDrawer ? (
        <Appbar.Action
          icon={drawer}
          onPress={() => navigation.openDrawer()}
          color={colors.silverMetallic}
        />
      ) : (
        <Appbar.Action
          icon={back}
          onPress={() => navigation.goBack()}
          color={colors.white}
        />
      )}

      {/* Name of current page / input field responsible for changing name */}
      <Controller
        control={control}
        name='label'
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.title}
            editable={editable}
            value={value}
            onChangeText={onChange}
            returnKeyType='done'
            onEndEditing={() => handleSubmit(submit(value))}
          />
        )}
      />

      {/* Additional actions */}
      {icon1 && (
        <Appbar.Action
          icon={icon1}
          color={colors.silverMetallic}
          onPress={onPressIcon1}
        />
      )}
      {icon2 && (
        <Appbar.Action
          icon={icon2}
          color={colors.silverMetallic}
          onPress={onPressIcon2}
        />
      )}
    </Appbar.Header>
  );
};

AppBar.propTypes = {
  label: PropTypes.string,
  isDrawer: PropTypes.bool,
  icon1: PropTypes.number,
  onPressIcon1: PropTypes.func,
  icon2: PropTypes.number,
  onPressIcon2: PropTypes.func,
  editable: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
};

const useStyles = makeStyles((theme, editable) => ({
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
    textTransform: editable ? 'none' : 'capitalize',
  },
}));

export default AppBar;
