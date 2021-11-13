import React from 'react';

import { View, Image } from 'react-native';
import { Text, Divider, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import { check } from 'assets/icons';
import FoodTypes from './FoodTypes';

const FridgeRow = ({ onPress, fridgeName, isActive = false }) => {
  const styles = useStyles();

  return (
    <View>
      <TouchableRipple onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>{fridgeName}</Text>
            <FoodTypes />
          </View>
          {isActive && <Image source={check} style={styles.icon} />}
        </View>
      </TouchableRipple>
      <Divider style={styles.divider} />
    </View>
  );
};

FridgeRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  fridgeName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    height: 1,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: theme.colors.silverMetallic,
    marginRight: 16,
  },
}));

export default FridgeRow;
