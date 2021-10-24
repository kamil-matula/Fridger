import React, { useState } from 'react';

import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Image,
  TextInputProps,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useController, Control, RegisterOptions } from 'react-hook-form';

import { makeStyles } from '../utils';
import visibility from '../../assets/images/visibility.png';
import visibilityOff from '../../assets/images/visibility_off.png';

const InputField = ({
  label,
  name,
  control,
  rules,
  variant = 'account',
  secure = false,
  ...props
}) => {
  const theme = useTheme();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control, rules });

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const styles = useStyles({ invalid, isFocused, variant });

  const handleOnFocus = () => setIsFocused(true);

  const handleOnBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  const passwordVisibilityOnPress = () => setSecureTextEntry((it) => !it);
  console.log(props);
  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          name={field.name}
          ref={field.ref}
          value={field.value}
          onChangeText={field.onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          blurOnSubmit={false}
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor={theme.colors.silverMetallic}
          {...props}
        />
        {secure && (
          <TouchableWithoutFeedback onPress={passwordVisibilityOnPress}>
            <Image
              source={secureTextEntry ? visibilityOff : visibility}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        )}
      </View>

      {invalid && <Text style={styles.errorText}>{error.message}</Text>}
    </>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  rules: PropTypes.object,
  variant: PropTypes.oneOf(['account', 'data']),
  secure: PropTypes.bool,
};

const useStyles = makeStyles((theme, { invalid, isFocused, variant }) => {
  const borderColor = (() => {
    if (isFocused) return theme.colors.text;
    if (invalid) return theme.colors.tartOrange;
    if (variant === 'account') return 'transparent';
    return theme.colors.whiteSemiTransparent;
  })();

  return {
    label: {
      fontSize: 14,
      marginBottom: 8,
      color: theme.colors.text,
    },
    inputContainer: {
      flexDirection: 'row',
      height: 48,
      paddingLeft: 16,
      borderWidth: 1,
      borderRadius: 5,
      alignItems: 'center',
      borderColor: borderColor,
      backgroundColor:
        variant === 'data' ? 'transparent' : theme.colors.primary,
    },
    input: {
      color: theme.colors.text,
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
});

export default InputField;
