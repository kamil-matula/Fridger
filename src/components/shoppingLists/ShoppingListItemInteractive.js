import React from 'react';

import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';
import { useController } from 'react-hook-form';

import { makeStyles } from 'utils';

// This component is used in second tab of Shopping List Details
const ShoppingListItemInteractive = ({
  control,
  text,
  subText,
  boxName,
  checkBoxName,
  setValue,
  onEndEditing,
  onChangeStatus,
  currency,
}) => {
  // Controllers:
  const box = useController({ name: boxName, control, rules: {} });
  const checkbox = useController({ name: checkBoxName, control, rules: {} });

  // Styling:
  const { colors } = useTheme();
  const styles = useStyles({ fieldValue: checkbox.field.value });

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        {/* Checkbox responsible for changing product state: 
            unchecked or indeterminate */}
        <Checkbox
          color={colors.silverMetallic}
          uncheckedColor={colors.silverMetallic}
          status={checkbox.field.value}
          onPress={() => {
            if (checkbox.field.value === 'unchecked') {
              setValue(checkBoxName, 'indeterminate');
            } else if (checkbox.field.value === 'indeterminate') {
              setValue(checkBoxName, 'unchecked');
            }
            onChangeStatus();
          }}
        />
      </View>

      {/* Name, quantity and note of specific product */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>

      {/* Temporary price of indeterminate product */}
      <View style={styles.priceContainer}>
        {checkbox.field.value === 'indeterminate' && (
          <>
            {/* TODO: Replace with Input Field? */}
            <TextInput
              name={box.field.name}
              onChangeText={box.field.onChange}
              value={box.field.value.toString()}
              style={styles.inputField}
              placeholderTextColor={colors.silverMetallic}
              placeholder='0'
              keyboardType='numeric'
              maxLength={5}
              onEndEditing={onEndEditing}
              onFocus={() => {
                console.log('focus');
              }}
              onBlur={() => {
                console.log('blur');
              }}
            />
            <Text style={styles.text}>{currency}</Text>
          </>
        )}
      </View>
    </View>
  );
};

ShoppingListItemInteractive.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  control: PropTypes.object.isRequired,
  boxName: PropTypes.string,
  checkBoxName: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onEndEditing: PropTypes.func,
  onChangeStatus: PropTypes.func,
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
      width: 64,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 16,
      marginVertical: 4,
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

export default ShoppingListItemInteractive;
