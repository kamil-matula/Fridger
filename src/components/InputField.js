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

        {/* Confirming changes */}
        {confirmable && (
          <View style={styles.iconContainer}>
            <TouchableRipple onPress={onSubmitEditing}>
              <Image source={check} style={styles.icon} />
            </TouchableRipple>
          </View>
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
  variant: PropTypes.oneOf(['account', 'data']),
  secure: PropTypes.bool,
  confirmable: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  flex: PropTypes.number,
};

const useStyles = makeStyles(
  (theme, { invalid, isFocused, variant, confirmable, flex }) => {
    const borderColor = (() => {
      if (isFocused) return theme.colors.white;
      if (invalid) return theme.colors.tartOrange;
      if (variant === 'account') return 'transparent';
      return theme.colors.whiteSemiTransparent;
    })();

    return {
      label: {
        fontSize: 14,
        marginBottom: 8,
        color: theme.colors.white,
      },
      inputContainer: {
        flex,
        flexDirection: 'row',
        height: 48,
        paddingLeft: 16,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        borderColor,
        backgroundColor:
          variant === 'data' ? 'transparent' : theme.colors.primary,
      },
      input: {
        color: theme.colors.white,
        fontSize: 14,
        includeFontPadding: false,
        flex: 1,
      },
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
