import React from 'react';

import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { makeStyles } from 'utils';

// This component is used in third tab of Shopping List Details
const PriceSummary = ({ value, currency }) => {
  const styles = useStyles();

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.total}>TOTAL:</Text>
      <Text style={styles.totalPrice}>
        {value} {currency}
      </Text>
    </View>
  );
};

PriceSummary.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  summaryContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.silverMetallic,
  },
  totalPrice: {
    paddingRight: 16,
    paddingBottom: 0,
    fontSize: 24,
    color: theme.colors.white,
    textAlign: 'right',
  },
}));

export default PriceSummary;
