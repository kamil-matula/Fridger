import React from 'react';

import { View, Text, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import { reduce } from 'assets/icons';

const FridgeDetailsRow = ({ product, onPressIcon, onPressRow }) => {
  const styles = useStyles();

  return (
    <TouchableRipple onPress={onPressRow}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
          ) : (
            <View style={styles.image} />
          )}
        </View>
        <View style={styles.textsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          {product.producer_name !== '' && (
            <Text style={styles.producer}>{product.producer_name}</Text>
          )}
          <Text style={styles.quantity}>
            {product.quantity_left} / {product.quantity_base}{' '}
            {product.quantity_type.toLowerCase()}
          </Text>
          {product.expiration_date && (
            <Text style={styles.expirationDate}>
              expiration date: {product.expiration_date}
            </Text>
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableRipple onPress={onPressIcon}>
            <Image source={reduce} style={styles.icon} />
          </TouchableRipple>
        </View>
      </View>
    </TouchableRipple>
  );
};

FridgeDetailsRow.propTypes = {
  product: PropTypes.object.isRequired,
  onPressIcon: PropTypes.func.isRequired,
  onPressRow: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imageContainer: {
    width: 64,
  },
  image: {
    // TODO: Add better placeholder
    backgroundColor: theme.colors.blueJeans,
    height: 80,
    width: 64,
  },
  textsContainer: {
    paddingLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: theme.colors.white,
  },
  producer: {
    fontSize: 12,
    color: theme.colors.silverMetallic,
  },
  quantity: {
    fontSize: 12,
    color: theme.colors.silverMetallic,
  },
  expirationDate: {
    fontSize: 10,
    color: theme.colors.tartOrange,
  },
  iconContainer: { borderRadius: 64, overflow: 'hidden' },
  icon: {
    width: 32,
    height: 32,
    tintColor: theme.colors.silverMetallic,
    margin: 4,
  },
}));

export default FridgeDetailsRow;
