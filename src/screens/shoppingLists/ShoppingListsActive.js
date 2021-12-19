import React from 'react';

import { ListOfShoppingLists } from 'components/shoppingLists';
import { useShoppingListsQuery } from 'services/fridger/shoppingLists';

const ShoppingListsActive = ({ navigation }) => {
  const shoppingLists = useShoppingListsQuery({ isArchived: false });

  return (
    <ListOfShoppingLists
      shoppingLists={shoppingLists}
      navigation={navigation}
      placeholderContent={`You have no active\nshopping lists to display`}
    />
  );
};

export default ShoppingListsActive;
