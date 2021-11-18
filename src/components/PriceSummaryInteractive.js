import React from 'react';

import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native';
import { useController } from 'react-hook-form';

import { makeStyles } from 'utils';

const PriceSummaryInteractive = ({ control, name, onEndEditing }) => {
  const styles = useStyles();

  const { field } = useController({ name, control });

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.total}>TOTAL:</Text>
      <TextInput
        style={styles.totalPrice}
        name={field.name}
        onChangeText={field.onChange}
        value={field.value.toString()}
        keyboardType='numeric'
        maxLength={15}
        onEndEditing={onEndEditing}
      />
      <Text style={styles.currency}> zł</Text>
    </View>
  );
};

PriceSummaryInteractive.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onEndEditing: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  summaryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.silverMetallic,
  },
  totalPrice: {
    flex: 1,
    paddingBottom: 0,
    fontSize: 24,
    color: theme.colors.white,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.silverMetallic,
  },
  currency: {
    paddingRight: 16,
    paddingBottom: 0,
    fontSize: 24,
    color: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.silverMetallic,
  },
}));

export default PriceSummaryInteractive;
