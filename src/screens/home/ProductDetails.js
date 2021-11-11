import React, { useState } from 'react';

import { View, Image, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, ScoresContainer, ScrollViewLayout, Dialog } from 'components';
import { makeStyles } from 'utils';
import { deleteIcon, time } from 'assets/icons';
import { productsInFridgeList } from 'tmpData';

const ProductDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Params from navigation:
  const { productID, fridgeID, fridgeName } = route.params;
  const product = productsInFridgeList.find((e) => e.id === productID);

  // Deleting:
  const [deleteProductDialogVisible, setDeleteProductDialogVisible] =
    useState(false);
  const confirmRemoveProduct = () => {
    // TODO: Send request to API and wait for removing product from the fridge
    console.log(
      `Product #${productID} has been deleted from fridge #${fridgeID}`
    );

    // Hide dialog and go back:
    setDeleteProductDialogVisible(false);
    navigation.pop();
  };
  const cancelRemoveProduct = () => {
    // Hide dialog:
    setDeleteProductDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <AppBar
        icon1={time}
        icon2={deleteIcon}
        onPressIcon1={() => {
          // TODO: Open dialog responsible for changing expiration date
        }}
        onPressIcon2={() => {
          // Open dialog responsible for deleting product
          setDeleteProductDialogVisible(true);
        }}
      />

      {/* Main content */}
      <ScrollViewLayout addPadding={false}>
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

        {/* Additives */}
        <View style={styles.additivesContainer}>
          <Text style={styles.additivesTitle}>Additives</Text>
          {product.additives.map((element) => (
            <Text key={element.code} style={styles.additivesRow}>
              {'   '}•{'   '}
              {element.code} - {element.description}
            </Text>
          ))}
        </View>
        <Divider style={styles.divider} />

        {/* Nutrients */}
        <View style={styles.nutrientsContainer}>
          <View style={styles.nutrientRow}>
            <Text style={styles.nutrientHeader}>Nutrition facts</Text>
            <Text style={styles.nutrientHeader}>100 g / 100 ml</Text>
          </View>
          <Divider style={styles.divider} />
          {[
            ['Energy (kJ)', `${product.nutritions.energy} kJ`],
            ['Fat', `${product.nutritions.fat} g`],
            [
              '   •   Saturated fat',
              `${product.nutritions['saturated-fat']} g`,
            ],
            ['Carbohydrates', `${product.nutritions.carbohydrates} g`],
            ['   •   Sugars', `${product.nutritions.sugars} g`],
            ['Proteins', `${product.nutritions['saturated-fat']} g`],
            ['Salt', `${product.nutritions.salt} g`],
            ['   •   Sodium', `${product.nutritions.sodium} g`],
          ].map((element) => (
            <View key={element[0]}>
              <View style={styles.nutrientRow}>
                <Text style={styles.nutrientText}>{element[0]}</Text>
                <Text style={styles.nutrientText}>{element[1]}</Text>
              </View>
              <Divider style={styles.divider} />
            </View>
          ))}
        </View>
      </ScrollViewLayout>

      {/* Deleting product from fridge */}
      <Dialog
        title='Delete product'
        paragraph={`Are you sure you want to delete product ${product.name} from fridge ${fridgeName}? This action cannot be undone.`}
        visibilityState={[
          deleteProductDialogVisible,
          setDeleteProductDialogVisible,
        ]}
        label1='delete'
        onPressLabel1={confirmRemoveProduct}
        label2='cancel'
        onPressLabel2={cancelRemoveProduct}
      />
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

  // Additives:
  additivesContainer: {
    margin: 16,
  },
  additivesTitle: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
    paddingBottom: 4,
  },
  additivesRow: {
    fontSize: 14,
    color: theme.colors.white,
  },

  // Nutrients:
  nutrientsContainer: {
    margin: 16,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  nutrientHeader: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
  },
  nutrientText: {
    fontSize: 14,
    color: theme.colors.white,
  },
}));

export default ProductDetails;
