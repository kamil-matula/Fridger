import React from 'react';

import { View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

import { ActivityIndicator, Placeholder, Separator } from 'components';
import { PriceSummary, ShoppingListItem, Chip } from 'components/shoppingLists';
import { makeStyles } from 'utils';

import { useShoppingListSummaryQuery } from 'services/fridger/shoppingListProducts';

const ShoppingListSummary = ({ route }) => {
  const styles = useStyles();

  const shoppingListSummaryQuery = useShoppingListSummaryQuery({
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
        status={product.status}
      />
    ));

  return (
    <View style={styles.container}>
      {shoppingListSummaryQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {shoppingListSummaryQuery?.data.users.length > 0 ? (
            <ScrollView>
              <View>
                {shoppingListSummaryQuery?.data.users.map((user, idx) => {
                  const notBoughtProducts = user.products.filter(
                    (product) =>
                      product.status === 'unchecked' ||
                      product.status === 'indeterminate'
                  );
                  const boughtProducts = user.products.filter(
                    (product) => product.status === 'checked'
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
          ) : (
            <Placeholder content='No products to display' />
          )}
        </>
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
