import React, { useState } from 'react';

import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { useController } from 'react-hook-form';
import PropTypes from 'prop-types';

import { check, visibilityOn, visibilityOff } from 'assets/icons';
import { makeStyles } from 'utils';
import Separator from './Separator';

const InputField = ({
  label,
  name,
  control,
  rules,
  variant = 'account',
  secure = false,
  confirmable = false,
  onSubmitEditing,
  flex,
  postfix,
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
  const styles = useStyles({ invalid, isFocused, variant, confirmable, flex });
  const theme = useTheme();

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {/* Data providing */}
        <TextInput
          name={field.name}
          ref={field.ref}
          value={field.value}
          onChangeText={field.onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          blurOnSubmit={!onSubmitEditing}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secure ? secureTextEntry : false}
          style={styles.input}
          placeholderTextColor={
            variant === 'quantity'
              ? theme.colors.white
              : theme.colors.silverMetallic
          }
          {...props}
        />

        {/* Maximum quantity */}
        {variant === 'quantity' && (
          <Text style={styles.inputPostfix}>{postfix}</Text>
        )}

        {/* Password hiding */}
        {secure && (
          <TouchableWithoutFeedback onPress={passwordVisibilityOnPress}>
            <Image
              source={secureTextEntry ? visibilityOff : visibilityOn}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        )}

        {/* Confirming changes */}
        {confirmable && (
          <View style={styles.iconContainer}>
            <TouchableRipple onPress={onSubmitEditing}>
              <Image source={check} style={styles.icon} />
            </TouchableRipple>
          </View>
        )}
      </View>

      {/* Current error */}
      {invalid ? (
        <Text style={styles.errorText}>{error.message}</Text>
      ) : (
        <Separator height={variant === 'quantity' ? 0 : 20} />
      )}
    </>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  rules: PropTypes.object,
  variant: PropTypes.oneOf(['account', 'data', 'quantity']),
  secure: PropTypes.bool,
  confirmable: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  flex: PropTypes.number, // needed in AppBar
  postfix: PropTypes.string, // needed in ReduceQuantity dialog
};

const useStyles = makeStyles(
  (theme, { invalid, isFocused, variant, confirmable, flex }) => {
    const borderColor = (() => {
      if (isFocused) return theme.colors.white;
      if (invalid) return theme.colors.tartOrange;
      if (variant === 'account') return 'transparent';
      if (variant === 'quantity') return theme.colors.white;
      return theme.colors.whiteSemiTransparent;
    })();

    return {
      // Text above input field:
      label: {
        fontSize: 14,
        marginBottom: 8,
        color: theme.colors.white,
      },

      // Input field:
      inputContainer: {
        flex,
        flexDirection: 'row',
        height: variant === 'quantity' ? 37 : 48,
        paddingLeft: 16,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        borderColor,
        backgroundColor:
          variant === 'account' ? theme.colors.primary : 'transparent',
      },

      // Text in input field:
      input: {
        color: theme.colors.white,
        fontSize: variant === 'quantity' ? 18 : 14,
        includeFontPadding: false,
        textAlign: variant === 'quantity' ? 'right' : null,
        paddingRight: 8,
        flex: 1,
      },

      // Maximum quantity:
      inputPostfix: {
        color: theme.colors.silverMetallic,
        fontSize: 18,
        paddingRight: 8,
      },

      // Hiding password or submitting icons:
      iconContainer: {
        borderRadius: 64,
        overflow: 'hidden',
        marginHorizontal: confirmable ? 12 : 0,
      },
      icon: {
        height: 24,
        width: 24,
        marginHorizontal: confirmable ? 0 : 12,
        tintColor: theme.colors.silverMetallic,
      },

      // Error below input field:
      errorText: {
        fontSize: 12,
        marginTop: 4,
        paddingLeft: 16,
        color: theme.colors.tartOrange,
      },
    };
  }
);

export default InputField;
