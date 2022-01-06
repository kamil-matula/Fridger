import React from 'react';

import { View, Text } from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const RadioButtonGroup = ({ items, checkedState }) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const [value, setValue] = checkedState;

  return (
    <RadioButton.Group onValueChange={(v) => setValue(v)} value={value}>
      {items.map((e) => (
        <View key={e} style={styles.container}>
          <RadioButton.Android
            value={e}
            color={colors.white}
            uncheckedColor={colors.silverMetallic}
          />
          <Text style={styles.label}>{e}</Text>
        </View>
      ))}
    </RadioButton.Group>
  );
};

RadioButtonGroup.propTypes = {
  items: PropTypes.array.isRequired,
  checkedState: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 0,
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: theme.colors.white,
    textTransform: 'capitalize',
    textAlign: 'left',
    paddingLeft: 8,
  },
}));

export default RadioButtonGroup;
