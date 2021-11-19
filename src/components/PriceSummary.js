import React from 'react';

import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { makeStyles } from 'utils';

const PriceSummary = ({ value }) => {
  const styles = useStyles();

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.total}>TOTAL:</Text>
      <Text style={styles.totalPrice}>{value}</Text>
      <Text style={styles.currency}> zł</Text>
    </View>
  );
};

PriceSummary.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
  },
  currency: {
    paddingRight: 16,
    paddingBottom: 0,
    fontSize: 24,
    color: theme.colors.white,
  },
}));

export default PriceSummary;
