import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ShoppingListTabNavigator from 'navigation/ShoppingListTabNavigator';
import { ShoppingListDetails } from 'screens/home';

const ShoppingList = createStackNavigator();
const ShoppingListNavigator = () => (
  <ShoppingList.Navigator screenOptions={{ headerShown: false }}>
    <ShoppingList.Screen
      name='ShoppingListTabNavigator'
      component={ShoppingListTabNavigator}
    />
    <ShoppingList.Screen
      name='ShoppingListDetails'
      component={ShoppingListDetails}
    />
  </ShoppingList.Navigator>
);

export default ShoppingListNavigator;
