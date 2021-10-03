import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import { View, Button } from 'react-native';

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

const MainStack = createStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name='DrawerNavigation' component={DrawerNavigation} />
    </MainStack.Navigator>
  );
};

export default Navigation;
