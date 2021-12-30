import React from 'react';

import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { makeStyles } from 'utils';

// This component is used in third tab of Shopping List Details:
const ShoppingListItemSummary = ({ text, subText, boxText, status }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* Checkbox variant helps in informing about product state 
          (bought or unbought). It is used in third tab. */}
      <View style={styles.checkbox}>
        <Checkbox disabled status={status} />
      </View>

      {/* Name, quantity and note of specific product */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>

      {/* Price of bought product */}
      {boxText && (
        <View style={styles.priceContainer}>
          <Text style={styles.text}>{boxText}</Text>
        </View>
      )}
    </View>
  );
};

ShoppingListItemSummary.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  boxText: PropTypes.string,
  status: PropTypes.oneOf(['checked', 'unchecked', 'indeterminate']),
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.silverMetallic,
  },
}));

export default ShoppingListItemSummary;
