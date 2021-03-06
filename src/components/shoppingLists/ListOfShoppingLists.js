import React from 'react';

import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

import { makeStyles } from 'utils';
import { ActivityIndicator, Placeholder, Separator } from 'components';
import ShoppingListRow from './ShoppingListRow';

const ListOfShoppingLists = ({
  shoppingLists,
  placeholderContent,
  navigation,
  isFAB = false,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {shoppingLists.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {shoppingLists.data?.length > 0 ? (
            <ScrollView>
              {shoppingLists.data.map((list) => (
                <View key={list.id}>
                  <ShoppingListRow
                    label={list.name}
                    unchecked={list.free_products_count}
                    dips={list.taken_products_count}
                    checked={list.bought_products_count}
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

              {/* Space for FAB and nav bar */}
              <Separator height={isFAB ? 54 + 88 : 54} />
            </ScrollView>
          ) : (
            <>
              <Placeholder content={placeholderContent} />
              {/* Space for nav bar */}
              <Separator height={54} />
            </>
          )}
        </>
      )}
    </View>
  );
};

ListOfShoppingLists.propTypes = {
  shoppingLists: PropTypes.object.isRequired,
  placeholderContent: PropTypes.string.isRequired,
  isFAB: PropTypes.bool,
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
