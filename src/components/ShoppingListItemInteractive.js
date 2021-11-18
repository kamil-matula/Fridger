import React from 'react';

import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useController } from 'react-hook-form';

import { makeStyles } from 'utils';
import { Checkbox, useTheme } from 'react-native-paper';

const ShoppingListItemInteractive = ({
  control,
  text,
  subText,
  boxText,
  boxName,
  checkBoxName,
  setValue,
  onEndEditing,
  onChangeStatus,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const box = useController({ name: boxName, control, rules: {} });
  const checkbox = useController({ name: checkBoxName, control, rules: {} });

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        <Checkbox
          color={theme.colors.silverMetallic}
          uncheckedColor={theme.colors.silverMetallic}
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
        {checkbox.field.value !== 'indeterminate' ? (
          <Text style={styles.text}>{boxText}</Text>
        ) : (
          <>
            <TextInput
              name={box.field.name}
              ref={box.field.ref}
              onChangeText={box.field.onChange}
              value={box.field.value.toString()}
              style={styles.inputField}
              placeholderTextColor={theme.colors.silverMetallic}
              placeholder='0'
              keyboardType='numeric'
              maxLength={5}
              onEndEditing={onEndEditing}
            />
            <Text style={styles.text}> zł</Text>
          </>
        )}
      </View>
    </View>
  );
};

ShoppingListItemInteractive.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  boxText: PropTypes.string,
  control: PropTypes.object.isRequired,
  boxName: PropTypes.string,
  checkBoxName: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onEndEditing: PropTypes.func,
  onChangeStatus: PropTypes.func,
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
