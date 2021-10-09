import React, { useState } from 'react';

import { View, TextInput, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';
import visibility from '../../assets/images/visibility.png';
import visibilityOff from '../../assets/images/visibility_off.png';

const InputField = ({ label, variant = 'account', textInputProps, secure = false }) => {
  const theme = useTheme();

  const [borderColor, setBorderColor] = useState(variant === 'account' ? 'transparent' : theme.colors.text + '80');
  const styles = useStyles(borderColor);

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleOnFocus = () => {
    setBorderColor(theme.colors.text);
  };

  const handleOnBlur = () => {
    if (variant === 'account') setBorderColor('transparent');
    else if (variant === 'data') setBorderColor(theme.colors.text + '80');
  };

  const handleOnPress = () => {
    setSecureTextEntry((it) => !it);
  };

  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[styles.inputContainer, { backgroundColor: variant === 'data' ? 'transparent' : theme.colors.primary }]}
      >
        <TextInput
          {...textInputProps}
          style={styles.input}
          placeholderTextColor={theme.colors.silverMetallic}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          secureTextEntry={secure ? secureTextEntry : false}
        />
        {secure && (
          <TouchableWithoutFeedback onPress={handleOnPress}>
            <Image source={secureTextEntry ? visibilityOff : visibility} style={styles.icon} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(['account', 'data']),
  textInputProps: PropTypes.object,
  secure: PropTypes.bool,
};

const useStyles = makeStyles((theme, borderColor) => ({
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
}));

export default InputField;
