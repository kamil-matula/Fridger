import React from 'react';

import { Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const StatsCard = ({ title, icon, last1data, last7data, last30data }) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <Image style={styles.icon} source={icon} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.daysContainer}>
        <Text style={styles.subtitle}>Last 24 hours</Text>
        <Text style={styles.subtitle}>Last 7 days</Text>
        <Text style={styles.subtitle}>Last 30 days</Text>
      </View>
      <View style={styles.quantitiesContainer}>
        <View style={styles.quantitiesColumn}>
          {last1data.map((element, index) => (
            <Text key={`last1_${index}`} style={styles.text}>
              {element}
            </Text>
          ))}
        </View>
        <View style={styles.quantitiesColumn}>
          {last7data.map((element, index) => (
            <Text key={`last7_${index}`} style={styles.text}>
              {element}
            </Text>
          ))}
        </View>
        <View style={styles.quantitiesColumn}>
          {last30data.map((element, index) => (
            <Text key={`last30_${index}`} style={styles.text}>
              {element}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.number,
  last1data: PropTypes.arrayOf(PropTypes.string).isRequired,
  last7data: PropTypes.arrayOf(PropTypes.string).isRequired,
  last30data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    padding: 8,
    marginVertical: 8,
  },
  icon: {
    tintColor: theme.colors.silverMetallic,
    height: 48,
    width: 48,
    margin: 8,
  },
  title: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  daysContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    marginBottom: 2,
  },
  subtitle: {
    color: theme.colors.silverMetallic,
  },
  quantitiesContainer: { flexDirection: 'row' },
  quantitiesColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  text: {
    color: theme.colors.white,
  },
}));

export default StatsCard;
