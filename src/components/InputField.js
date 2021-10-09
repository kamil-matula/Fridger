import React, { useState } from 'react';

import { View, TextInput, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';
import visibility from '../../assets/images/visibility.png';
import visibilityOff from '../../assets/images/visibility_off.png';

const InputField = ({ label, placeholder, style, textState, reference, returnKeyType = 'done', secure = false }) => {
  const theme = useTheme();

  const [borderColor, setBorderColor] = useState('transparent');
  const styles = useStyles(borderColor);

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [text, setText] = textState;
  const [self, next] = reference;

  const handleOnFocus = () => {
    setBorderColor(theme.colors.text);
  };

  const handleOnBlur = () => {
    setBorderColor('transparent');
  };

  const handleOnPress = () => {
    setSecureTextEntry((it) => !it);
  };

  console.log(`render input field ${label}`);
  console.log(`self ${self}`);
  console.log(`next ${next}`);

  return (
    <>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, style]}>
        <TextInput
          ref={self}
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.silverMetallic}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          returnKeyType={returnKeyType}
          secureTextEntry={secure ? secureTextEntry : false}
          onSubmitEditing={() => next?.current?.focus()}
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
  placeholder: PropTypes.string,
  style: PropTypes.object,
  textState: PropTypes.array,
  reference: PropTypes.array,
  returnKeyType: PropTypes.oneOf([
    'done',
    'go',
    'next',
    'search',
    'send',
    'none',
    'previous',
    'default',
    'emergency-call',
    'google',
    'join',
    'route',
    'yahoo',
  ]),
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
    backgroundColor: theme.colors.primary,
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
