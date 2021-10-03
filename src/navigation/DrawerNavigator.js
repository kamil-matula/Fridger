import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import { useTheme } from 'react-native-paper';
import { ChangePassword, DeleteAccount, EditProfile, Friends } from '../screens/drawer';
import { DrawerContent } from './DrawerContent';

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
      drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}
    >
      <Drawer.Screen name='Home' component={BottomNavigator} />
      <Drawer.Screen name='EditProfile' component={EditProfile} options={{ headerShown: false }} />
      <Drawer.Screen
        name='ChangePassword'
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name='Friends' component={Friends} options={{ headerShown: false }} />
      <Drawer.Screen
        name='DeleteAccount'
        component={DeleteAccount}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
