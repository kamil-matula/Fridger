import React from 'react';

import { View, Image } from 'react-native';
import { Text, Divider, TouchableRipple } from 'react-native-paper';

import { makeStyles } from '../utils';
import breadIcon from '../../assets/images/food/bread.png';
import cheeseIcon from '../../assets/images/food/cheese.png';
import eggsIcon from '../../assets/images/food/eggs.png';
import fruitsIcon from '../../assets/images/food/fruits.png';
import hamIcon from '../../assets/images/food/ham.png';
import milkIcon from '../../assets/images/food/milk.png';
import vegetablesIcon from '../../assets/images/food/vegetables.png';

const FridgeRow = ({ title }) => {
  const styles = useStyles();

  return (
    <View>
      <TouchableRipple
        onPress={() => {
          /* TODO: Add navigation */
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{title}</Text>
          {/* TODO: Create a component for these images and pass some data to it (to render appropriate circles) */}
          <View style={styles.images}>
            {[vegetablesIcon, fruitsIcon, hamIcon, cheeseIcon, breadIcon, eggsIcon, milkIcon].map((item, index) => (
              <View key={'foodicon-' + index} style={styles.iconContainer}>
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
    width: '100%',
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
  images: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 24,
    height: 24,
    position: 'relative',
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
    backgroundColor: 'white',
  },
}));

export default FridgeRow;
