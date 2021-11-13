import React from 'react';

import { View, Image } from 'react-native';
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

const FoodTypes = ({ disabled = false }) => {
  // At the moment we use the same circle color for all food types,
  // even if it is not true. Later we will probably delete this component
  const styles = useStyles({ disabled });

  return (
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
  );
};

FoodTypes.propTypes = {
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme, { disabled }) => ({
  images: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: disabled
      ? theme.colors.silverMetallicSemiTransparent
      : theme.colors.silverMetallic,
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: disabled ? theme.colors.richBlack : theme.colors.darkGreen,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
}));

export default FoodTypes;
