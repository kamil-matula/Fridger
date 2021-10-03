import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabs from './HomeTabs';
import { useTheme } from 'react-native-paper';
import { ChangePassword, DeleteAccount, EditProfile, Friends } from '../screens';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  const colors = useTheme().colors;

  return (
    <Drawer.Navigator
      initialRouteName='HomeTabs'
      screenOptions={{
        headerTransparent: true,
        headerTintColor: colors.text,
        headerTitleStyle: { color: 'transparent' },
      }}
    >
      <Drawer.Screen name='Home' component={HomeTabs} />
      <Drawer.Screen name='EditProfile' component={EditProfile} />
      <Drawer.Screen name='ChangePassword' component={ChangePassword} />
      <Drawer.Screen name='Friends' component={Friends} />
      <Drawer.Screen name='DeleteAccount' component={DeleteAccount} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
