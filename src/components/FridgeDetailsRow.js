import React from 'react';

import { View, Text, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import { reduce } from 'assets/icons';

const FridgeDetailsRow = ({ product }) => {
  const styles = useStyles();

  return (
    <TouchableRipple
      onPress={() => {
        // TODO: Add navigating to "Product Details Page"
      }}
    >
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
        <View style={{ borderRadius: 64, overflow: 'hidden' }}>
          <TouchableRipple
            onPress={() => {
              // TODO: Display "Reduce Quantity Dialog"
            }}
          >
            <Image source={reduce} style={styles.icon} />
          </TouchableRipple>
        </View>
      </View>
    </TouchableRipple>
  );
};

FridgeDetailsRow.propTypes = {
  product: PropTypes.object,
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
  image: { height: 64, resizeMode: 'contain' },
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
  icon: {
    width: 32,
    height: 32,
    tintColor: theme.colors.silverMetallic,
    margin: 4,
  },
}));

export default FridgeDetailsRow;
