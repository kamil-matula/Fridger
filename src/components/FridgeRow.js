import React from 'react';

import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text, Divider, TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';
import {
  breadIcon,
  cheeseIcon,
  eggsIcon,
  fruitsIcon,
  hamIcon,
  milkIcon,
  vegetablesIcon,
} from 'assets/images/food';

const FridgeRow = ({ title }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableRipple
        onPress={() => {
          navigation.navigate('FridgeDetails');
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          {/* TODO: Create a component for these images and pass some data to it (to render appropriate circles) */}
          <View style={styles.images}>
            {[
              vegetablesIcon,
              fruitsIcon,
              hamIcon,
              cheeseIcon,
              breadIcon,
              eggsIcon,
              milkIcon,
            ].map((item, index) => (
              <View key={'foodicon-' + index}>
                <Image source={item} style={styles.icon} />
                <View style={styles.circle} />
              </View>
            ))}
          </View>
        </View>
      </TouchableRipple>
      <Divider style={styles.divider} />
    </View>
  );
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
