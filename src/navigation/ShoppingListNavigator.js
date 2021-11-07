import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ShoppingLists, ShoppingListDetails } from 'screens/home';

const Stack = createStackNavigator();
const ShoppingListNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='ShoppingListsList' component={ShoppingLists} />
    <Stack.Screen name='ShoppingListDetails' component={ShoppingListDetails} />
  </Stack.Navigator>
);

export default ShoppingListNavigator;
