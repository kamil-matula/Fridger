import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';

// This component is used in second tab of Shopping List Details:
const ShoppingListItemYour = ({
  text,
  subText,
  status,
  price,
  onChangeStatus,
  onChangePrice,
  currency,
}) => {
  const { colors } = useTheme();
  const styles = useStyles({ fieldValue: status });

  const [currentPrice, setCurrentPrice] = useState(price);

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        {/* Checkbox responsible for changing product state: 
            unchecked or indeterminate */}
        <Checkbox.Android
          color={colors.silverMetallic}
          uncheckedColor={colors.silverMetallic}
          status={status}
          onPress={onChangeStatus}
        />
      </View>

      {/* Name, quantity and note of specific product */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>

      {/* Temporary price of indeterminate product */}
      <View style={styles.priceContainer}>
        {status === 'indeterminate' && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                onEndEditing={() => onChangePrice(currentPrice)}
                onChangeText={(newPrice) => {
                  const newNewPrice = newPrice.replace(',', '.');
                  if (!Number.isNaN(Number(newNewPrice)))
                    setCurrentPrice(newNewPrice);
                }}
                value={currentPrice}
                style={styles.inputField}
                placeholderTextColor={colors.silverMetallic}
                placeholder='0'
                keyboardType='numeric'
                maxLength={5}
              />
            </View>
            <Text style={styles.text}>{currency}</Text>
          </>
        )}
      </View>
    </View>
  );
};

ShoppingListItemYour.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  status: PropTypes.string,
  price: PropTypes.string,
  onChangeStatus: PropTypes.func,
  onChangePrice: PropTypes.func,
  currency: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme, { fieldValue }) => {
  const obj = {
    container: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    checkbox: {
      marginRight: 16,
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
    },
    text: {
      fontSize: 14,
      color: theme.colors.white,
    },
    inputField: {
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
      marginVertical: 4,
      paddingHorizontal: 8,
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  // Container for price:
  if (fieldValue === 'indeterminate') {
    obj.priceContainer.borderRadius = 5;
    obj.priceContainer.borderWidth = 1;
    obj.priceContainer.borderColor = theme.colors.silverMetallic;
  }

  return obj;
});

export default ShoppingListItemYour;
