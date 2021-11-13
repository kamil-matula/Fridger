import React from 'react';

import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text, Divider, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import FoodTypes from './FoodTypes';

const FridgeRow = ({ fridgeID, fridgeName }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableRipple
        onPress={() => {
          navigation.navigate('FridgeDetails', { fridgeID, fridgeName });
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{fridgeName}</Text>
          <FoodTypes />
        </View>
      </TouchableRipple>
      <Divider style={styles.divider} />
    </View>
  );
};

FridgeRow.propTypes = {
  fridgeID: PropTypes.string.isRequired,
  fridgeName: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    height: 1,
  },
}));

export default FridgeRow;
