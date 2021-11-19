import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ShoppingLists } from 'screens/home';
import ShoppingListDetailsTabNavigator from './ShoppingListDetailsTabNavigator';

const ShoppingList = createStackNavigator();
const ShoppingListNavigator = () => (
  <ShoppingList.Navigator screenOptions={{ headerShown: false }}>
    <ShoppingList.Screen name='ShoppingListsList' component={ShoppingLists} />
    <ShoppingList.Screen
      name='ShoppingListDetailsTabNavigator'
      component={ShoppingListDetailsTabNavigator}
    />
  </ShoppingList.Navigator>
);

export default ShoppingListNavigator;
