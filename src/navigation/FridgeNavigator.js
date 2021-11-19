import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Fridges } from 'screens/home';
import { FridgeDetails } from 'screens/fridges';

const Stack = createStackNavigator();
const FridgeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='FridgesList' component={Fridges} />
    <Stack.Screen name='FridgeDetails' component={FridgeDetails} />
  </Stack.Navigator>
);

export default FridgeNavigator;
