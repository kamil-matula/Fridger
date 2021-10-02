import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from './HomeTabs';

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

const MainStack = createStackNavigator();
const MainNavigator = () => (
  <MainStack.Navigator headerMode='none'>
    <MainStack.Screen name='HomeTabs' component={HomeTabs} />
  </MainStack.Navigator>
);

export default Navigation;
