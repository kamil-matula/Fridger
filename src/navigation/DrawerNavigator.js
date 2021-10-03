import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import { useTheme } from 'react-native-paper';
import { ChangePassword, DeleteAccount, EditProfile, Friends } from '../screens/drawer';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const colors = useTheme().colors;

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTransparent: true,
        headerTintColor: colors.text,
        headerTitleStyle: { color: 'transparent' },
      }}
    >
      <Drawer.Screen name='Home' component={BottomNavigator} />
      <Drawer.Screen name='EditProfile' component={EditProfile} />
      <Drawer.Screen name='ChangePassword' component={ChangePassword} />
      <Drawer.Screen name='Friends' component={Friends} />
      <Drawer.Screen name='DeleteAccount' component={DeleteAccount} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
