import React from 'react';

import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';

import { makeStyles } from 'utils';

const IconAndBadge = ({ icon, number }) => {
  const styles = useStyles();

  const num = number > 10 ? '+9' : number;

  return (
    <View style={styles.iconContainer}>
      <Image style={styles.icon} source={icon} />
      <View style={styles.badge}>
        <Text style={styles.text}>{num}</Text>
      </View>
    </View>
  );
};

IconAndBadge.propTypes = {
  icon: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    position: 'relative',
    height: 32,
    width: 32,
  },
  icon: {
    height: 32,
    width: 32,
    tintColor: theme.colors.silverMetallic,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 15,
    width: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.richBlack,
  },
  text: {
    fontSize: 10,
    color: theme.colors.text,
  },
}));

export default IconAndBadge;
