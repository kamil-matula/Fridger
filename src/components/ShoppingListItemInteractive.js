import React from 'react';

import PropTypes from 'prop-types';
import { Text, View, TextInput } from 'react-native';
import { useController } from 'react-hook-form';

import { makeStyles } from 'utils';
import { Checkbox, useTheme } from 'react-native-paper';

const ShoppingListItemInteractive = ({
  control,
  text,
  subText,
  boxName,
  checkBoxName,
  setValue,
  onEndEditing,
  onChangeStatus,
}) => {
  // Controllers:
  const box = useController({ name: boxName, control, rules: {} });
  const checkbox = useController({ name: checkBoxName, control, rules: {} });

  const theme = useTheme();
  const styles = useStyles({ fieldValue: checkbox.field.value });

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
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>
      <View style={styles.quantityContainer}>
        {checkbox.field.value === 'indeterminate' && (
          <>
            {/* TODO: Replace with Input Field? */}
            <TextInput
              name={box.field.name}
              onChangeText={box.field.onChange}
              value={box.field.value.toString()}
              style={styles.inputField}
              placeholderTextColor={theme.colors.silverMetallic}
              placeholder='0'
              keyboardType='numeric'
              maxLength={5}
              onEndEditing={onEndEditing}
            />
            <Text style={styles.text}>zł</Text>
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
    quantityContainer: {
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
    obj.quantityContainer.borderRadius = 5;
    obj.quantityContainer.borderWidth = 1;
    obj.quantityContainer.borderColor = theme.colors.silverMetallic;
  }

  return obj;
});

export default ShoppingListItemInteractive;
