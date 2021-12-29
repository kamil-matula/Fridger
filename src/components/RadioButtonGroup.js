import React from 'react';
import PropTypes from 'prop-types';

import { RadioButton, useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';

const RadioButtonGroup = ({ items, checkedState }) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const [value, setValue] = checkedState;

  return (
    <RadioButton.Group onValueChange={(v) => setValue(v)} value={value}>
      {items.map((e) => (
        <RadioButton.Item
          key={e}
          label={e}
          value={e}
          position='leading'
          labelStyle={styles.label}
          style={styles.container}
          color={colors.white}
          uncheckedColor={colors.silverMetallic}
        />
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
