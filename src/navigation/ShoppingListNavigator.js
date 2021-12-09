import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import { ShoppingLists } from 'screens/home';
import ShoppingListDetails from 'screens/shoppingLists/ShoppingListDetails';

const ShoppingList = createStackNavigator();
const ShoppingListNavigator = () => {
  const { colors } = useTheme();
  return (
    <ShoppingList.Navigator
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={{ backgroundColor: colors.background }}
    >
      <ShoppingList.Screen name='ShoppingListsList' component={ShoppingLists} />
      <ShoppingList.Screen
        name='ShoppingListDetails'
        component={ShoppingListDetails}
      />
    </ShoppingList.Navigator>
  );
};

export default ShoppingListNavigator;
