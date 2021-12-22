import React from 'react';

import { View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

import { LoadingOverlay, Separator } from 'components';
import { PriceSummary, ShoppingListItem, Chip } from 'components/shoppingLists';
import { makeStyles } from 'utils';

import { statusFromBackToFront } from 'utils/dataConverting';
import { useShoppingListSummaryQuery } from 'services/fridger/shoppingListProducts';

const ShoppingListSummary = ({ route }) => {
  const styles = useStyles();

  const summary = useShoppingListSummaryQuery({
    id: route.params.shoppingListID,
  });

  const productsList = (products) =>
    products.map((product, idx) => (
      <ShoppingListItem
        key={idx}
        text={product.name}
        subText={
          product.note
            ? `${product.quantity} ${product.quantity_type}  •  ${product.note}`
            : `${product.quantity} ${product.quantity_type}`
        }
        boxText={product.price ? `${product.price} PLN` : null}
        variant='checkbox'
        status={statusFromBackToFront(product.status)}
      />
    ));

  return (
    <View style={styles.container}>
      {summary.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          <View>
            {summary?.data.users.map((user, idx) => {
              const notBoughtProducts = user.products.filter(
                (product) =>
                  product.status === 'TAKER' ||
                  product.status === 'TAKER_MARKED'
              );
              const boughtProducts = user.products.filter(
                (product) => product.status === 'BUYER'
              );

              return (
                <View key={idx}>
                  {/* Sub-list owner */}
                  <View style={{ paddingHorizontal: 16 }}>
                    <Separator />
                    <Chip avatarURI={user.avatar} text={user.username} />
                    <Separator />
                  </View>

                  {/* Products */}
                  {productsList(notBoughtProducts)}
                  {notBoughtProducts.length > 0 &&
                    boughtProducts.length > 0 && (
                      <Divider style={styles.divider} />
                    )}
                  {productsList(boughtProducts)}

                  {/* Total price */}
                  <PriceSummary value={user.total_price} currency='PLN' />
                  <Divider style={styles.dividerWide} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    margin: 16,
  },
  dividerWide: {
    marginVertical: 16,
  },
}));

export default ShoppingListSummary;
