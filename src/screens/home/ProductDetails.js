import React from 'react';

import { View, Image, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar } from 'components';
import { makeStyles } from 'utils';
import { deleteIcon, time } from 'assets/icons';
import { productsInFridgeList } from 'tmpData';
import { N1, N2, N3, N4, A, B, C, D, E } from 'assets/icons/nova-nutri';

const ProductDetails = () => {
  const styles = useStyles();

  // Temporary, mocked data:
  const product = productsInFridgeList[0];

  // Nova-Score icon:
  const novaIcon = (() => {
    if (product.nova === 'N1') return N1;
    if (product.nova === 'N2') return N2;
    if (product.nova === 'N3') return N3;
    if (product.nova === 'N4') return N4;
    return null;
  })();

  // Nutri-Score icon:
  const nutriIcon = (() => {
    if (product.nutri === 'A') return A;
    if (product.nutri === 'B') return B;
    if (product.nutri === 'C') return C;
    if (product.nutri === 'D') return D;
    if (product.nutri === 'E') return E;
    return null;
  })();

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
      <View style={styles.ratingContainer}>
        <Image source={novaIcon} style={styles.icon} />
        <Image source={nutriIcon} style={styles.icon} />
      </View>
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
