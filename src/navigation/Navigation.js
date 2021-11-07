import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, ResetPassword, Register, RegisterFeedback } from 'screens/auth';
import { AddFridge } from 'screens/home';
import {
  FriendProfile,
  AddFriend,
  Share,
  EditPermissions,
} from 'screens/friends';
import DrawerNavigator from './DrawerNavigator';

const Navigation = () => (
  <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
);

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* BEFORE AUTHENTICATION */}
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='ResetPassword' component={ResetPassword} />
    <Stack.Screen name='Register' component={Register} />
    <Stack.Screen name='RegisterFeedback' component={RegisterFeedback} />

    {/* LEVEL 1 (BOTTOM TABS) & LEVEL 2 (ACCOUNT MANAGEMENT, FRIDGE/LIST DETAILS) */}
    <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />

    {/* LEVEL 2 */}
    <Stack.Screen name='AddFridge' component={AddFridge} />
    <Stack.Screen name='AddFriend' component={AddFriend} />
    <Stack.Screen name='FriendProfile' component={FriendProfile} />

    {/* LEVEL 3 */}
    <Stack.Screen name='Share' component={Share} />
    <Stack.Screen name='EditPermissions' component={EditPermissions} />
  </Stack.Navigator>
);

export default Navigation;
