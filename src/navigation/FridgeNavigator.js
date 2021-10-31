import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AddFridge, FridgeDetails, Fridges } from 'screens/home';

const Stack = createStackNavigator();
const FridgeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='FridgesList' component={Fridges} />
    <Stack.Screen name='FridgeDetails' component={FridgeDetails} />
    <Stack.Screen name='AddFridge' component={AddFridge} />
  </Stack.Navigator>
);

export default FridgeNavigator;
