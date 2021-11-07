import React, { useState } from 'react';

import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';

import { visibilityOn, visibilityOff } from 'assets/icons';
import { makeStyles } from 'utils';
import Separator from './Separator';

const InputField = ({
  label,
  name,
  control,
  rules,
  icon,
  onIconPress,
  variant = 'account',
  secure = false,
  confirmable = false,
  onSubmitEditing,
  blurOnSubmit = false,
  ...props
}) => {
  // Validation:
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control, rules });

  // Handle focusing:
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = () => setIsFocused(true);
  const handleOnBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  // Password hiding:
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const passwordVisibilityOnPress = () => setSecureTextEntry((it) => !it);

  // Styling:
  const styles = useStyles({ invalid, isFocused, variant, confirmable });
  const theme = useTheme();

  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        {/* Data providing */}
        <TextInput
          name={field.name}
          ref={field.ref}
          value={field.value}
          onChangeText={field.onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          blurOnSubmit={!onSubmitEditing || blurOnSubmit}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secure ? secureTextEntry : false}
          style={styles.input}
          placeholderTextColor={theme.colors.silverMetallic}
          {...props}
        />

        {/* Password hiding */}
        {secure && (
          <TouchableWithoutFeedback onPress={passwordVisibilityOnPress}>
            <Image
              source={secureTextEntry ? visibilityOff : visibilityOn}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        )}
        {icon && (
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Image source={icon} style={styles.icon} />
          </TouchableWithoutFeedback>
        )}
      </View>

      {invalid ? (
        <Text style={styles.errorText}>{error.message}</Text>
      ) : (
        <Separator height={20} />
      )}
    </>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  rules: PropTypes.object,
  icon: PropTypes.number,
  onIconPress: PropTypes.func,
  variant: PropTypes.oneOf(['account', 'data']),
  secure: PropTypes.bool,
  confirmable: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
};

const useStyles = makeStyles((theme, { invalid, isFocused, variant }) => {
  const obj = {
    label: {
      color: theme.colors.white,
    },
    inputContainer: {
      flexDirection: 'row',
      height: 48,
      paddingLeft: 16,
      borderWidth: 1,
      borderRadius: 5,
      alignItems: 'center',
    },
    input: {
      color: theme.colors.white,
      fontSize: 14,
      includeFontPadding: false,
      flex: 1,
    },
    icon: {
      height: 32,
      width: 32,
      marginHorizontal: 12,
      tintColor: theme.colors.silverMetallic,
    },
    errorText: {
      fontSize: 12,
      marginTop: 4,
      paddingLeft: 16,
      color: theme.colors.tartOrange,
    },
  };

  // In exactly that order
  if (variant === 'account') {
    obj.inputContainer.borderColor = 'transparent';
    obj.inputContainer.backgroundColor = theme.colors.primary;
    obj.label.fontSize = 14;
    obj.label.marginBottom = 8;
  }
  if (variant === 'data') {
    obj.inputContainer.borderColor = theme.colors.whiteSemiTransparent;
    obj.inputContainer.backgroundColor = 'transparent';
    obj.label.fontSize = 18;
    obj.label.fontWeight = 'bold';
    obj.label.marginBottom = 16;
  }
  if (invalid) {
    obj.inputContainer.borderColor = theme.colors.tartOrange;
  }
  if (isFocused) {
    obj.inputContainer.borderColor = theme.colors.white;
  }

  return obj;
});

export default InputField;
