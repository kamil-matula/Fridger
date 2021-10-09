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
  label: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'contained', 'text']),
};

const useStyles = makeStyles((theme, variant) => {
  if (variant == 'outlined')
    return {
      buttonStyle: {
        borderWidth: 1,
        borderColor: theme.colors.blueJeans,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
      },
      textStyle: {
        color: theme.colors.blueJeans,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        includeFontPadding: false,
      },
    };
  else if (variant == 'contained')
    return {
      buttonStyle: {
        backgroundColor: theme.colors.blueJeans,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
      },
      textStyle: {
        color: theme.colors.richBlack,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        includeFontPadding: false,
      },
    };
  else if (variant == 'text')
    return {
      buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
      },
      textStyle: {
        color: theme.colors.blueJeans,
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        includeFontPadding: false,
      },
    };
  else return {};
});

export default Button;
