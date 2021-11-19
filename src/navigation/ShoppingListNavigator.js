import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ShoppingLists } from 'screens/home';
import ShoppingListDetails from 'screens/shoppingLists/ShoppingListDetails';

const ShoppingList = createStackNavigator();
const ShoppingListNavigator = () => (
  <ShoppingList.Navigator screenOptions={{ headerShown: false }}>
    <ShoppingList.Screen name='ShoppingListsList' component={ShoppingLists} />
    <ShoppingList.Screen
      name='ShoppingListDetails'
      component={ShoppingListDetails}
    />
  </ShoppingList.Navigator>
);

export default ShoppingListNavigator;
