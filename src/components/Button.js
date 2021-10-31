import React from 'react';

import { Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const Button = ({
  onPress,
  label,
  icon = null,
  variant,
  color = 'blue',
  fab = false,
  fabPosition,
  rounded = false,
}) => {
  const hasLabel = label ? true : false;
  const hasIcon = icon ? true : false;

  const styles = useStyles({
    variant,
    color,
    fab,
    fabPosition,
    rounded,
    hasLabel,
    hasIcon,
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {icon && <Image style={styles.icon} source={icon} />}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'contained', 'pureText']),
  color: PropTypes.oneOf(['blue', 'red']),
  fab: PropTypes.bool,
  fabPosition: PropTypes.oneOf(['right', 'left', 'center']),
  rounded: PropTypes.bool,
};

const useStyles = makeStyles(
  (theme, { variant, color, fab, fabPosition, rounded, hasLabel, hasIcon }) => {
    const obj = {
      button: {
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
      },
      icon: {
        height: 24,
        width: 24,
      },
      text: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        includeFontPadding: false,
      },
    };
    if (hasLabel && hasIcon) {
      obj.icon.marginHorizontal = 12;
      obj.text.marginRight = 20;
    }
    if (hasLabel && !hasIcon) {
      obj.button.paddingHorizontal = 20;
    }
    if (!hasLabel && hasIcon) {
      obj.button.padding = 16;
      obj.button.height = 56;
    }
    if (rounded) {
      obj.button.borderRadius = 28;
    }
    if (color == 'blue') {
      obj.text.color = theme.colors.blueJeans;
      obj.button.borderColor = theme.colors.blueJeans;
    }
    if (color == 'red') {
      obj.text.color = theme.colors.tartOrange;
      obj.button.borderColor = theme.colors.tartOrange;
    }
    if (variant == 'outlined') {
      obj.button.borderWidth = 1;
    }
    if (variant == 'contained') {
      obj.text.color = theme.colors.richBlack;
      if (color == 'blue') {
        obj.button.backgroundColor = theme.colors.blueJeans;
      }
      if (color == 'red') {
        obj.button.backgroundColor = theme.colors.tartOrange;
      }
    }
    if (variant == 'text') {
      obj.button.paddingHorizontal = 8;
    }
    if (variant == 'pureText') {
      obj.button.height = 'auto';
      obj.button.paddingHorizontal = 0;
      obj.text.fontWeight = 'normal';
      obj.text.textTransform = 'none';
    }
    if (fab) {
      obj.button.position = 'absolute';
      obj.button.bottom = 16;

      if (fabPosition == 'right') {
        obj.button.right = 16;
      }
      if (fabPosition == 'left') {
        obj.button.left = 16;
      }
      if (fabPosition == 'center') {
        obj.button.alignSelf = 'center';
      }
      if (fabPosition == undefined) {
        obj.button.right = 16;
        obj.button.left = 16;
      }
    }
    return obj;
  }
);

export default Button;
