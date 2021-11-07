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
  onSubmitEditing,
  blurOnSubmit = false,
  textAlign,
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
  const styles = useStyles({ invalid, isFocused, variant, textAlign });
  const theme = useTheme();

  return (
    <>
      {variant !== 'quantity' && <Text style={styles.label}>{label}</Text>}

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
        {icon && (
          <TouchableWithoutFeedback onPress={onIconPress}>
            <Image source={icon} style={styles.icon} />
          </TouchableWithoutFeedback>
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
  icon: PropTypes.number,
  onIconPress: PropTypes.func,
  variant: PropTypes.oneOf(['account', 'data', 'quantity']),
  secure: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  postfix: PropTypes.string, // needed in ReduceQuantity dialog
};

const useStyles = makeStyles(
  (theme, { invalid, isFocused, variant, textAlign }) => {
    // Common styles:
    const obj = {
      // Text above input field:
      label: {
        marginBottom: variant === 'data' ? 16 : 8,
        fontWeight: variant === 'data' ? 'bold' : null,
        fontSize: variant === 'data' ? 18 : 14,
        color: theme.colors.white,
      },

      // Input field:
      inputContainer: {
        backgroundColor:
          variant === 'account' ? theme.colors.primary : 'transparent',
        height: variant === 'quantity' ? 37 : 48,
        flexDirection: 'row',
        paddingLeft: 16,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
      },

      // Text in input field:
      input: {
        fontSize: variant === 'quantity' ? 18 : 14,
        color: theme.colors.white,
        includeFontPadding: false,
        paddingRight: 8,
        flex: 1,
        textAlign,
      },

      // Maximum quantity:
      inputPostfix: {
        color: theme.colors.silverMetallic,
        fontSize: 18,
        paddingRight: 8,
      },

      // Hiding password:
      icon: {
        height: 24,
        width: 24,
        marginHorizontal: 12,
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

    // Specific borders:
    if (variant === 'account') obj.inputContainer.borderColor = 'transparent';
    if (variant === 'data')
      obj.inputContainer.borderColor = theme.colors.whiteSemiTransparent;
    if (variant === 'quantity')
      obj.inputContainer.borderColor = theme.colors.white;
    if (invalid) obj.inputContainer.borderColor = theme.colors.tartOrange;
    if (isFocused) obj.inputContainer.borderColor = theme.colors.white;

    return obj;
  }
);

export default InputField;
