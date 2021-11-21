import React from 'react';

import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const Button = ({
  onPress,
  label,
  icon = null,
  variant,
  color = 'blue',
  rounded = false,
  isLoading = false,
}) => {
  const hasLabel = !!label;
  const hasIcon = !!icon;

  const { colors } = useTheme();
  const styles = useStyles({
    variant,
    color,
    rounded,
    hasLabel,
    hasIcon,
  });

  // NOTE: For some reason creating activity indicator
  // as separate component results in ignoring 'height' property
  // and the indicator is bigger than it supposed to be.
  return !isLoading ? (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {icon && <Image style={styles.icon} source={icon} />}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size='large' color={colors.blueJeans} />
    </View>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  icon: PropTypes.number,
  variant: PropTypes.oneOf(['outlined', 'contained', 'text', 'pureText'])
    .isRequired,
  color: PropTypes.oneOf(['blue', 'red']),
  rounded: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const useStyles = makeStyles(
  (theme, { variant, color, rounded, hasLabel, hasIcon }) => {
    // Common styles:
    const obj = {
      button: {
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
      },
      indicatorContainer: {
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

    // Margins (depend on content):
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

    // Shape:
    if (rounded) {
      obj.button.borderRadius = 28;
    }

    // Colors:
    if (color === 'blue') {
      obj.text.color = theme.colors.blueJeans;
      obj.button.borderColor = theme.colors.blueJeans;
    }
    if (color === 'red') {
      obj.text.color = theme.colors.tartOrange;
      obj.button.borderColor = theme.colors.tartOrange;
    }
    if (variant === 'outlined') {
      obj.button.borderWidth = 1;
    }
    if (variant === 'contained') {
      obj.text.color = theme.colors.richBlack;
      if (color === 'blue') {
        obj.button.backgroundColor = theme.colors.blueJeans;
      }
      if (color === 'red') {
        obj.button.backgroundColor = theme.colors.tartOrange;
      }
    }

    // TextButtons:
    if (variant === 'text') {
      obj.button.paddingHorizontal = 8;
    }
    if (variant === 'pureText') {
      obj.button.height = 'auto';
      obj.button.paddingHorizontal = 0;
      obj.text.fontWeight = 'normal';
      obj.text.textTransform = 'none';
    }

    return obj;
  }
);

export default Button;
