import React from 'react';

import PropTypes from 'prop-types';
import { Image, Text, View, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';
import { hand, handFilled } from 'assets/icons';
import { tmpPerson } from 'assets/images';

// This component is used in first tab of Shopping List Details:
const ShoppingListItemAll = ({
  avatarURI,
  text,
  subText,
  onPressIcon,
  showHand,
  productStatus,
  isFilled = false,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* Avatar which informs who reserved the product */}
      {productStatus !== 'free' ? (
        <Image
          style={styles.avatar}
          source={avatarURI ? { uri: avatarURI } : tmpPerson}
        />
      ) : (
        <View style={styles.avatarPlaceholder} />
      )}

      {/* Name, quantity and note of specific product */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>

      {/* Button for reserving products */}
      {showHand && (
        <View style={styles.iconContainer}>
          <TouchableRipple onPress={onPressIcon}>
            <Image source={isFilled ? handFilled : hand} style={styles.icon} />
          </TouchableRipple>
        </View>
      )}

      {/* TODO: Add indicator and maybe move request to 'dibs' method here, 
          to have access to isLoading of separate request */}
    </View>
  );
};

ShoppingListItemAll.propTypes = {
  avatarURI: PropTypes.string,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  onPressIcon: PropTypes.func,
  showHand: PropTypes.bool,
  productStatus: PropTypes.oneOf([
    'free',
    'unchecked',
    'indeterminate',
    'checked',
  ]).isRequired,
  isFilled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
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
  iconContainer: { borderRadius: 64, overflow: 'hidden' },
  icon: {
    width: 32,
    height: 32,
    tintColor: theme.colors.silverMetallic,
    margin: 4,
  },
}));

export default ShoppingListItemAll;
