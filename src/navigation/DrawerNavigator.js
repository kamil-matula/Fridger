import React from 'react';

import { useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  ChangePassword,
  DeleteAccount,
  EditProfile,
  Friends,
  FriendProfile,
  AddFriend,
} from 'screens/drawer';
import BottomNavigator from './BottomNavigator';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTransparent: true,
        headerTintColor: colors.text,
        headerTitleStyle: { color: 'transparent' },
      }}
      drawerContent={({ navigation }) => (
        // Custom design for drawer content:
        <DrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen
        name='Home'
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name='EditProfile'
        component={EditProfile}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name='ChangePassword'
        component={ChangePassword}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name='Friends'
        component={Friends}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name='DeleteAccount'
        component={DeleteAccount}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name='FriendProfile'
        component={FriendProfile}
        options={{ headerShown: false, swipeEnabled: false }}
      />
      <Drawer.Screen
        name='AddFriend'
        component={AddFriend}
        options={{ headerShown: false, swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
