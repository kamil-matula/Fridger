import React from 'react';

import { ListOfShoppingLists } from 'components/shoppingLists';
import { useShoppingListsQuery } from 'services/fridger/shoppingLists';

const ShoppingListsActive = ({ navigation }) => {
  const shoppingLists = useShoppingListsQuery(
    { isArchived: false },
    { pollingInterval: 5000 }
  );

  return (
    <ListOfShoppingLists
      shoppingLists={shoppingLists}
      navigation={navigation}
      placeholderContent={`No active\nshopping lists to display`}
      isFAB
    />
  );
};

export default ShoppingListsActive;
