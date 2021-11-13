import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ShoppingListTabNavigator from 'navigation/ShoppingListTabNavigator';
import ShoppingListDetailsTabNavigator from 'navigation/ShoppingListDetailsTabNavigator';

const ShoppingList = createStackNavigator();
const ShoppingListNavigator = () => (
  <ShoppingList.Navigator screenOptions={{ headerShown: false }}>
    <ShoppingList.Screen
      name='ShoppingListTabNavigator'
      component={ShoppingListTabNavigator}
    />
    <ShoppingList.Screen
      name='ShoppingListDetailsTabNavigator'
      component={ShoppingListDetailsTabNavigator}
    />
  </ShoppingList.Navigator>
);

export default ShoppingListNavigator;
