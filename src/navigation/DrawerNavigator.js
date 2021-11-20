import React from 'react';

import { useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
        headerTintColor: colors.white,
        headerTitleStyle: { color: 'transparent' },
        swipeEdgeWidth: 0, // disable opening drawer via swipe
      }}
      drawerContent={({ navigation }) => (
        // Custom design for drawer content
        // (contains connections with drawer screens like EditProfile):
        <DrawerContent navigation={navigation} />
      )}
    >
      {/* MAIN SCREEN: MENU, FRIDGES, SHOPPING LISTS (+ DETAILS) */}
      <Drawer.Screen
        name='Home'
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
