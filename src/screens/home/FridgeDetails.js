import React from 'react';

import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, FloatingActionButton, FridgeDetailsRow } from 'components';
import { makeStyles } from 'utils';

const DATA = [
  {
    id: 1,
    name: 'Pain de mie à la farine complète',
    producer: 'La Boulangère Bio',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',
  },
  {
    id: 2,
    name: 'Pain de mie à la farine complète',
    producer: 'La Boulangère Bio',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',
  },
  {
    id: 3,
    name: 'Pain de mie à la farine complète',
    producer: 'La Boulangère Bio',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',
  },
];

const FridgeDetails = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* TODO: Use label and items from specific fridge */}
      <AppBar label='Home' />
      <Divider style={styles.divider} />
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <FridgeDetailsRow product={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <FloatingActionButton onPress={() => {
        // TODO: Add navigating to "ADD PRODUCT PAGE"
      }} />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    width: '100%',
    height: 1,
  },
  list: {
    width: '100%',
  },
}));

export default FridgeDetails;
