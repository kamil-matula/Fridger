/* eslint-disable camelcase */
import React from 'react';

import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import { makeStyles } from 'utils';
import { LoadingOverlay } from 'components';
import { ShoppingListRow } from 'components/shoppingLists';

import { useShoppingListsQuery } from 'services/fridger/shoppingLists';

const ShoppingListsHistory = ({ navigation }) => {
  const styles = useStyles();

  const shoppingLists = useShoppingListsQuery({ isArchived: true });

  return (
    <View style={styles.container}>
      {shoppingLists.isLoading ? (
        <LoadingOverlay />
      ) : (
        shoppingLists.data.map(
          ({
            id,
            name,
            bought_products_count,
            taken_products_count,
            free_products_count,
            is_shared,
            is_archived,
          }) => (
            <View key={id}>
              <ShoppingListRow
                label={name}
                unchecked={bought_products_count}
                dips={taken_products_count}
                checked={free_products_count}
                isShared={is_shared}
                isActive={!is_archived}
                onPress={() => {
                  // Go to specific shopping list:
                  navigation.navigate('ShoppingListDetails', {
                    shoppingListID: id,
                  });
                }}
              />
              <Divider />
            </View>
          )
        )
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.white,
  },
}));

export default ShoppingListsHistory;
