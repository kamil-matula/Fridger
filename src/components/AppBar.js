import React, { useState } from 'react';

import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { back, drawer } from 'assets/icons';
import { makeStyles } from 'utils';
import { InputField } from 'components';

const AppBar = ({
  label = '',
  isDrawer = false,
  icon1 = null,
  onPressIcon1 = null,
  icon2 = null,
  onPressIcon2 = null,
  editable = false,
}) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Editing fridge / shopping list's name:
  const [isEditMode, setIsEditMode] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: label,
    },
  });
  const confirmNewName = (data) => {
    // TODO: Send request to API to change fridge/list's name
    console.log(`New name: ${data.name}`);

    // Hide input field:
    setIsEditMode(false);
    reset();
  };

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

      {/* Input field responsible for changing name */}
      {isEditMode && (
        <InputField
          control={control}
          name='name'
          returnKeyType='done'
          placeholder={label}
          onSubmitEditing={handleSubmit(confirmNewName)}
          confirmable
        />
      )}

      {/* Name of current page */}
      {!isEditMode && (
        <Appbar.Content
          title={label}
          titleStyle={styles.title}
          onPress={() => {
            // Display input field to change name:
            if (editable) setIsEditMode(true);
          }}
        />
      )}

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
};

const useStyles = makeStyles((theme) => ({
  bar: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
}));

export default AppBar;
