import React from 'react';

import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';

const Button = ({ onPress, label, variant }) => {
  const styles = useStyles(variant);

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['outlined', 'contained', 'text', 'pureText']),
};

const useStyles = makeStyles((theme, variant) => {
  const obj = {
    buttonStyle: {
      borderColor: theme.colors.blueJeans,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
    },
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      includeFontPadding: false,
    },
  };
  if (variant == 'outlined') {
    obj.buttonStyle.borderWidth = 1;
    obj.textStyle.color = theme.colors.blueJeans;
  }
  if (variant == 'contained') {
    obj.textStyle.color = theme.colors.richBlack;
    obj.buttonStyle.backgroundColor = theme.colors.blueJeans;
  }
  if (variant == 'text') {
    obj.textStyle.color = theme.colors.blueJeans;
  }
  if (variant == 'pureText') {
    obj.buttonStyle.height = 'auto';
    obj.textStyle.color = theme.colors.blueJeans;
    obj.textStyle.fontWeight = 'normal';
    obj.textStyle.textTransform = 'none';
  }
  return obj;
});

export default Button;
