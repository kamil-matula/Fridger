import React from 'react';

import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput } from 'react-native';

import { makeStyles } from 'utils';
import { Checkbox, useTheme } from 'react-native-paper';

const ShoppingListItemInteractive = ({
  control,
  text,
  subText,
  quantity,
  unit,
  status,
  statusName,
  price,
  priceName,
  onCheckboxPress,
  onPriceChange,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        <Checkbox
          name={statusName}
          control={control}
          color={theme.colors.silverMetallic}
          uncheckedColor={theme.colors.silverMetallic}
          status={status}
          onPress={onCheckboxPress}
        />
      </View>
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
        {status !== 'indeterminate' ? (
          <Text style={styles.text}>{`${quantity} ${unit}`}</Text>
        ) : (
          <>
            <TextInput
              name={priceName}
              control={control}
              style={styles.inputField}
              placeholderTextColor={theme.colors.silverMetallic}
              placeholder='0'
              keyboardType='numeric'
              onChange={onPriceChange}
              value={price.toString()}
              maxLength={5}
            />
            <Text style={styles.text}> zł</Text>
          </>
        )}
      </View>
    </View>
  );
};

ShoppingListItemInteractive.propTypes = {
  control: PropTypes.object,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  quantity: PropTypes.number,
  unit: PropTypes.string,
  status: PropTypes.oneOf(['checked', 'unchecked', 'indeterminate']),
  statusName: PropTypes.string,
  price: PropTypes.number,
  priceName: PropTypes.string,
  onCheckboxPress: PropTypes.func,
  onPriceChange: PropTypes.func,
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
  inputField: {
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

export default ShoppingListItemInteractive;
