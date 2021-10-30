import React from 'react';

import { View, Text, Image } from 'react-native';

import { makeStyles } from 'utils';
import reduce from 'assets/images/reduce.png';

const FridgeDetailsRow = ({ product }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.producer}>{product.producer}</Text>
        <Text style={styles.quantity}>
          {product.currentQuantity} / {product.maxQuantity}{' '}
          {product.quantityType}
        </Text>
        <Text style={styles.expirationDate}>
          expiration date: {product.expirationDate}
        </Text>
      </View>
      <Image source={reduce} style={styles.icon} />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    width: 64,
  },
  image: { height: 64, resizeMode: 'contain' },
  textsContainer: {
    paddingLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: theme.colors.text,
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
  icon: {
    width: 32,
    height: 32,
    tintColor: theme.colors.silverMetallic,
  },
}));

export default FridgeDetailsRow;
