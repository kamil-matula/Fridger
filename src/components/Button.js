import React from 'react';

import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';

const Button = ({ onPress, label, variant, color = 'blue' }) => {
  const styles = useStyles({ variant, color });

  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['outlined', 'contained', 'pureText']),
  color: PropTypes.oneOf(['blue', 'red']),
};

const useStyles = makeStyles((theme, { variant, color }) => {
  const obj = {
    buttonStyle: {
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      paddingHorizontal: 8,
    },
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      includeFontPadding: false,
    },
  };
  if (color == 'blue') {
    obj.textStyle.color = theme.colors.blueJeans;
    obj.buttonStyle.borderColor = theme.colors.blueJeans;
  }
  if (color == 'red') {
    obj.textStyle.color = theme.colors.tartOrange;
    obj.buttonStyle.borderColor = theme.colors.tartOrange;
  }
  if (variant == 'outlined') {
    obj.buttonStyle.borderWidth = 1;
  }
  if (variant == 'contained') {
    obj.textStyle.color = theme.colors.richBlack;
    if (color == 'blue') {
      obj.buttonStyle.backgroundColor = theme.colors.blueJeans;
    }
    if (color == 'red') {
      obj.buttonStyle.backgroundColor = theme.colors.tartOrange;
    }
  }
  if (variant == 'pureText') {
    obj.buttonStyle.height = 'auto';
    obj.textStyle.fontWeight = 'normal';
    obj.textStyle.textTransform = 'none';
  }
  return obj;
});

export default Button;
