import React from 'react';

import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const StatsCard = ({ title, last7data, last30data }) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.daysContainer}>
        <Text style={styles.subtitle}>Last 7 days</Text>
        <Text style={styles.subtitle}>Last 30 days</Text>
      </View>
      <View style={styles.quantitiesContainer}>
        <View style={styles.quantitiesColumn}>
          {last7data.map((e, index) => (
            <Text key={`last7_${index}`} style={styles.text}>
              {e}
            </Text>
          ))}
        </View>
        <View style={styles.quantitiesColumn}>
          {last30data.map((e, index) => (
            <Text key={`last30_${index}`} style={styles.text}>
              {e}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  last7data: PropTypes.arrayOf(PropTypes.string).isRequired,
  last30data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
  },
  title: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  daysContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colors.silverMetallic,
    fontSize: 14,
  },
  quantitiesContainer: { flexDirection: 'row' },
  quantitiesColumn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
  },
}));

export default StatsCard;
