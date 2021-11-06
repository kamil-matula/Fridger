import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, ResetPassword, Register, RegisterFeedback } from 'screens/auth';
import { AddFridge, Share, EditPermission } from 'screens/home';
import DrawerNavigator from './DrawerNavigator';

const Navigation = () => (
  <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
);

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='ResetPassword' component={ResetPassword} />
    <Stack.Screen name='Register' component={Register} />
    <Stack.Screen name='RegisterFeedback' component={RegisterFeedback} />
    <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />
    <Stack.Screen name='AddFridge' component={AddFridge} />
    <Stack.Screen name='Share' component={Share} />
    <Stack.Screen name='EditPermission' component={EditPermission} />
  </Stack.Navigator>
);

export default Navigation;
