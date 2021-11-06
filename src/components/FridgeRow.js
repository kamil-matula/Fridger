import React from 'react';

import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text, Divider, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import {
  bread,
  cheese,
  eggs,
  fruits,
  ham,
  milk,
  vegetables,
} from 'assets/icons/food';

const FridgeRow = ({ title }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableRipple
        onPress={() => {
          navigation.navigate('FridgeDetails', { title });
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          {/* TODO: Replace list of icons with something new as we no longer use Food Supplies */}
          <View style={styles.images}>
            {[vegetables, fruits, ham, cheese, bread, eggs, milk].map(
              (item, index) => (
                <View key={`foodicon-${index}`}>
                  <Image source={item} style={styles.icon} />
                  <View style={styles.circle} />
                </View>
              )
            )}
          </View>
        </View>
      </TouchableRipple>
      <Divider style={styles.divider} />
    </View>
  );
};

FridgeRow.propTypes = {
  title: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  images: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.silverMetallic,
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    // TODO: Use appropriate color (green, red, black):
    backgroundColor: theme.colors.darkGreen,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    height: 1,
  },
}));

export default FridgeRow;
