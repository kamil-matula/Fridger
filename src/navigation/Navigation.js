import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login, ResetPassword, Register, RegisterFeedback } from 'screens/auth';
import {
  AddShoppingList,
  AddFridge,
  AddProductAutomat,
  AddProductManual,
  ProductDetails,
} from 'screens/home';
import {
  FriendProfile,
  AddFriend,
  Share,
  EditPermissions,
} from 'screens/friends';
import {
  EditProfile,
  ChangePassword,
  Friends,
  DeleteAccount,
} from 'screens/drawer';
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

    {/* LEVEL 1 (BOTTOM TABS) & LEVEL 2 (FRIDGE/LIST DETAILS) */}
    <Stack.Screen name='DrawerNavigator' component={DrawerNavigator} />

    {/* LEVEL 2 (DRAWER + ADDING NEW STUFF) */}
    <Stack.Screen name='EditProfile' component={EditProfile} />
    <Stack.Screen name='ChangePassword' component={ChangePassword} />
    <Stack.Screen name='Friends' component={Friends} />
    <Stack.Screen name='DeleteAccount' component={DeleteAccount} />
    <Stack.Screen name='AddFridge' component={AddFridge} />
    <Stack.Screen name='AddShoppingList' component={AddShoppingList} />
    <Stack.Screen name='AddFriend' component={AddFriend} />
    <Stack.Screen name='FriendProfile' component={FriendProfile} />

    {/* LEVEL 3 */}
    <Stack.Screen name='Share' component={Share} />
    <Stack.Screen name='EditPermissions' component={EditPermissions} />
    <Stack.Screen name='AddProductManual' component={AddProductManual} />
    <Stack.Screen name='AddProductAutomat' component={AddProductAutomat} />
    <Stack.Screen name='ProductDetails' component={ProductDetails} />
  </Stack.Navigator>
);

export default Navigation;
