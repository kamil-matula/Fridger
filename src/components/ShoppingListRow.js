import React from 'react';

import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';
import { checkBox, checkedCheckBox, hand } from 'assets/icons';
import IconAndBadge from './IconAndBadge';

const ShoppingListRow = ({ label, unchecked, checked, dips, onPress }) => {
  const styles = useStyles();

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
        <View style={styles.iconsContainer}>
          <IconAndBadge icon={checkBox} number={unchecked} />
          <View style={styles.horizontalSeparator} />
          <IconAndBadge icon={hand} number={dips} />
          <View style={styles.horizontalSeparator} />
          <IconAndBadge icon={checkedCheckBox} number={checked} />
        </View>
      </View>
    </TouchableRipple>
  );
};

ShoppingListRow.propTypes = {
  label: PropTypes.string.isRequired,
  unchecked: PropTypes.number.isRequired,
  checked: PropTypes.number.isRequired,
  dips: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 20,
  },
  horizontalSeparator: {
    marginHorizontal: 4,
  },
}));

export default ShoppingListRow;
