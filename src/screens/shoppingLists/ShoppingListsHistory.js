import React from 'react';

import { ListOfShoppingLists } from 'components/shoppingLists';
import { useShoppingListsQuery } from 'services/fridger/shoppingLists';

const ShoppingListsHistory = ({ navigation }) => {
  const shoppingLists = useShoppingListsQuery({ isArchived: true });

  return (
    <ListOfShoppingLists
      shoppingLists={shoppingLists}
      navigation={navigation}
      placeholderContent={`No inactive\nshopping lists to display`}
    />
  );
};

export default ShoppingListsHistory;
