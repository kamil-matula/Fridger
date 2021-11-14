import React from 'react';

import PropTypes from 'prop-types';
import { Image, Text, View, StyleSheet } from 'react-native';

import { makeStyles } from 'utils';
import { Checkbox } from 'react-native-paper';

const ShoppingListItem = ({
  avatarURI,
  text,
  subText,
  quantity,
  unit,
  price,
  variant = 'avatar',
  status,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {variant === 'avatar' &&
        (avatarURI ? (
          <Image style={styles.avatar} source={{ uri: avatarURI }} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        ))}
      {variant === 'checkbox' && (
        <Checkbox style={styles.checkbox} disabled status={status} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
        {subText && (
          <Text style={styles.subText} numberOfLines={1}>
            {subText}
          </Text>
        )}
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.text}>
          {variant === 'avatar' && `${quantity} ${unit}`}
          {variant === 'checkbox' &&
            (status === 'unchecked' ? `${quantity} ${unit}` : `${price} zł`)}
        </Text>
      </View>
    </View>
  );
};

ShoppingListItem.propTypes = {
  avatarURI: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  quantity: PropTypes.number,
  unit: PropTypes.string,
  price: PropTypes.number,
  variant: PropTypes.oneOf(['avatar', 'checkbox']),
  status: PropTypes.oneOf(['checked', 'unchecked', 'indeterminate']),
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    marginRight: 16,
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
  quantityContainer: {
    flexDirection: 'row',
    height: 32,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.silverMetallic,
  },
}));

export default ShoppingListItem;
