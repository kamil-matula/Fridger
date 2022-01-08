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
  onInputFieldPress,
  variant = 'account',
  secure = false,
  onSubmitEditing,
  blurOnSubmit = false,
  textAlign,
  postfix,
  paddings = true,
  onChangeText,
  inputFieldWith,
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
  const hasIcon = !!icon || secure;
  const styles = useStyles({
    invalid,
    isFocused,
    variant,
    textAlign,
    hasIcon,
    inputFieldWith,
  });
  const theme = useTheme();

  return (
    <>
      {/* Input field title */}
      {paddings && <Text style={styles.label}>{label}</Text>}

      <TouchableWithoutFeedback onPress={onInputFieldPress}>
        <View style={styles.inputContainer}>
          {/* Data providing */}
          <TextInput
            name={field.name}
            ref={field.ref}
            value={field.value}
            onChangeText={(newValue) => {
              // Additional preparing:
              let tmp = newValue;
              if (onChangeText) {
                tmp = onChangeText(newValue);
              }
              field.onChange(tmp);
            }}
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
          {postfix && <Text style={styles.inputPostfix}>{postfix}</Text>}

          {/* Password hiding */}
          {secure && (
            <TouchableWithoutFeedback onPress={passwordVisibilityOnPress}>
              <Image
                source={secureTextEntry ? visibilityOff : visibilityOn}
                style={styles.icon}
              />
            </TouchableWithoutFeedback>
          )}

          {/* Other icons, eg. calendar */}
          {icon &&
            (onIconPress ? (
              <TouchableWithoutFeedback onPress={onIconPress}>
                <Image source={icon} style={styles.icon} />
              </TouchableWithoutFeedback>
            ) : (
              <Image source={icon} style={styles.icon} />
            ))}
        </View>
      </TouchableWithoutFeedback>

      {/* Current error or space for it (if can occur) */}
      {invalid ? (
        <Text style={styles.errorText}>{error.message}</Text>
      ) : (
        <Separator height={paddings ? 20 : 0} />
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
  onInputFieldPress: PropTypes.func,
  variant: PropTypes.oneOf(['account', 'data', 'quantity']),
  secure: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
  textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  postfix: PropTypes.string,
  paddings: PropTypes.bool,
  inputFieldWith: PropTypes.number,
  onChangeText: PropTypes.func,
};

const useStyles = makeStyles(
  (
    theme,
    { invalid, isFocused, variant, textAlign, hasIcon, inputFieldWith }
  ) => {
    const obj = {
      // Text above input field:
      label: {
        color: theme.colors.white,
        fontWeight: 'bold',
        marginBottom: 8,
      },

      // Input field:
      inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
      },

      // Text in input field:
      input: {
        color: theme.colors.white,
        includeFontPadding: false,
        flex: 1,
        textAlign,
      },

      // Maximum quantity:
      inputPostfix: {
        color: theme.colors.silverMetallic,
        fontSize: 18,
        paddingRight: 8,
      },

      icon: {
        tintColor: theme.colors.silverMetallic,
        height: 24,
        width: 24,
      },

      // Error below input field:
      errorText: {
        fontSize: 12,
        marginTop: 4,
        paddingLeft: 16,
        color: theme.colors.tartOrange,
      },
    };

    if (variant === 'account') {
      obj.inputContainer.borderColor = 'transparent';
      obj.inputContainer.backgroundColor = theme.colors.primary;
      obj.inputContainer.height = 48;
      obj.inputContainer.paddingLeft = 16;
      obj.input.fontSize = 14;
      if (hasIcon) {
        obj.icon.marginHorizontal = 12;
      } else {
        obj.inputContainer.paddingRight = 16;
      }
      obj.label.fontSize = 14;
    }
    if (variant === 'data') {
      obj.inputContainer.borderColor = theme.colors.whiteSemiTransparent;
      obj.inputContainer.backgroundColor = 'transparent';
      obj.inputContainer.height = 37;
      obj.inputContainer.paddingLeft = 8;
      obj.input.fontSize = 16;
      if (hasIcon) {
        obj.icon.marginHorizontal = 8;
        obj.inputContainer.minWidth = 80;
      } else {
        obj.inputContainer.paddingRight = 8;
      }
      obj.label.fontSize = 16;
    }
    if (variant === 'quantity') {
      obj.inputContainer.borderColor = theme.colors.whiteSemiTransparent;
      obj.inputContainer.backgroundColor = 'transparent';
      obj.inputContainer.height = 37;
      obj.inputContainer.paddingHorizontal = 8;
      obj.input.fontSize = 18;
    }
    if (invalid) {
      obj.inputContainer.borderColor = theme.colors.tartOrange;
    }
    if (isFocused) {
      obj.inputContainer.borderColor = theme.colors.white;
    }
    if (inputFieldWith) {
      obj.inputContainer.width = inputFieldWith;
    }

    return obj;
  }
);

export default InputField;
