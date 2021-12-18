import React from 'react';

import PropTypes from 'prop-types';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Checkbox, TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';
import { hand } from 'assets/icons';

const ShoppingListItem = ({
  avatarURI,
  text,
  subText,
  boxText,
  variant = 'avatar',
  onPressIcon,
  showHand,
  status,
}) => {
  const styles = useStyles({ boxText });

  return (
    <View style={styles.container}>
      {/* Avatar variant helps in informing who reserved 
          the product. It is used in first tab. */}
      {variant === 'avatar' &&
        (avatarURI ? (
          <Image style={styles.avatar} source={{ uri: avatarURI }} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        ))}

      {/* Checkbox variant helps in informing about product state 
          (bought or unbought). It is used in third tab. */}
      {variant === 'checkbox' && (
        <View style={styles.checkbox}>
          <Checkbox disabled status={status} />
        </View>
      )}

      {/* Name, quantity and note of specific product */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>

      {/* Price of bought product or button */}
      {variant === 'avatar' ? (
        showHand && (
          <View style={styles.iconContainer}>
            <TouchableRipple onPress={onPressIcon}>
              <Image source={hand} style={styles.icon} />
            </TouchableRipple>
          </View>
        )
      ) : (
        <View style={styles.priceContainer}>
          <Text style={styles.text}>{boxText}</Text>
        </View>
      )}
    </View>
  );
};

ShoppingListItem.propTypes = {
  avatarURI: PropTypes.string,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  boxText: PropTypes.string,
  onPressIcon: PropTypes.func,
  showHand: PropTypes.bool,
  variant: PropTypes.oneOf(['avatar', 'checkbox']),
  status: PropTypes.oneOf(['checked', 'unchecked', 'indeterminate']),
};

const useStyles = makeStyles((theme, { boxText }) => {
  const obj = {
    container: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 32,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.silverMetallic,
      marginRight: 16,
      marginVertical: 4,
    },
    avatarPlaceholder: {
      width: 32,
      height: 32,
      marginRight: 16,
      marginVertical: 4,
    },
    checkbox: {
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
    },
    text: {
      fontSize: 14,
      color: theme.colors.white,
    },
    subText: {
      fontSize: 14,
      color: theme.colors.silverMetallic,
    },
    priceContainer: {
      flexDirection: 'row',
      height: 32,
      width: 64,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 16,
      marginVertical: 4,
    },
    iconContainer: { borderRadius: 64, overflow: 'hidden' },
    icon: {
      width: 32,
      height: 32,
      tintColor: theme.colors.silverMetallic,
      margin: 4,
    },
  };

  // Container for price:
  if (boxText) {
    obj.priceContainer.borderRadius = 5;
    obj.priceContainer.borderWidth = 1;
    obj.priceContainer.borderColor = theme.colors.silverMetallic;
  }

  return obj;
});

export default ShoppingListItem;
