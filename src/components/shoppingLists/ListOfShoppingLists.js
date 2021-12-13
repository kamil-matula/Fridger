import React from 'react';

import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

import { makeStyles } from 'utils';
import { LoadingOverlay } from 'components';
import ShoppingListRow from './ShoppingListRow';

const ListOfShoppingLists = ({ shoppingLists, navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {shoppingLists.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          {shoppingLists.data.map((list) => (
            <View key={list.id}>
              <ShoppingListRow
                label={list.name}
                unchecked={list.bought_products_count}
                dips={list.taken_products_count}
                checked={list.free_products_count}
                isShared={list.is_shared}
                isActive={!list.is_archived}
                onPress={() => {
                  // Go to specific shopping list:
                  navigation.navigate('ShoppingListDetails', {
                    shoppingListID: list.id,
                  });
                }}
              />
              <Divider />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

ListOfShoppingLists.propTypes = {
  shoppingLists: PropTypes.object.isRequired,
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

export default ListOfShoppingLists;
