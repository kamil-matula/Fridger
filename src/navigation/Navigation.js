import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import { Login, ResetPassword, Register, RegisterFeedback } from 'screens/auth';

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='RegisterFeedback' component={RegisterFeedback} />
      <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default Navigation;
