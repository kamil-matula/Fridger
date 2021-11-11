import React from 'react';

import { View, Image, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, ScoresContainer } from 'components';
import { makeStyles } from 'utils';
import { deleteIcon, time } from 'assets/icons';
import { productsInFridgeList } from 'tmpData';

const ProductDetails = () => {
  const styles = useStyles();

  // Temporary, mocked data:
  const product = productsInFridgeList[0];

  return (
    <View style={styles.container}>
      <AppBar
        icon1={time}
        icon2={deleteIcon}
        onPressIcon1={() => {
          // TODO: Open dialog responsible for changing expiration date
        }}
        onPressIcon2={() => {
          // TODO: Open dialog responsible for deleting product
        }}
      />

      {/* Basic information */}
      <View style={styles.basicInfoContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <View style={styles.textsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.producer}>{product.producer}</Text>
          <Text style={styles.quantity}>
            {product.maxQuantity} {product.quantityType}
          </Text>
        </View>
      </View>
      <Divider style={styles.divider} />

      {/* Rating */}
      <ScoresContainer
        novaScore={product.nova}
        nutriScore={product.nutri}
        containerStyle={styles.ratingContainer}
        iconStyle={styles.icon}
      />
      <Divider style={styles.divider} />

      {/* TODO: Add additives and nutrients */}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  // General:
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    width: '100%',
    height: 1,
  },

  // Basic info:
  basicInfoContainer: {
    flexDirection: 'row',
    margin: 16,
  },
  imageContainer: {
    width: 100,
  },
  image: { height: 100, resizeMode: 'contain' },
  textsContainer: {
    paddingLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: theme.colors.white,
    paddingBottom: 4,
  },
  producer: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
    paddingBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
  },

  // Rating:
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
  icon: {
    height: 48,
    resizeMode: 'contain',
  },
}));

export default ProductDetails;
