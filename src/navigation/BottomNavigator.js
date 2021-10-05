import React from 'react';

import { Image, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Menu, Fridges, ShoppingLists } from '../screens/home';

import menuIcon from '../../assets/images/menu.png';
import fridgeIcon from '../../assets/images/fridge.png';
import listIcon from '../../assets/images/list.png';

const Tab = createMaterialBottomTabNavigator();
const BottomNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      activeColor={colors.cyberYellow}
      barStyle={{ backgroundColor: colors.primary }}
      inactiveColor={colors.silverMetallic}
      shifting={false}
      backBehavior='none'
      initialRouteName='Menu'
    >
      <Tab.Screen
        name='Menu'
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={menuIcon}
              style={[styles.icon, { tintColor: focused ? colors.cyberYellow : colors.silverMetallic }]}
            />
          ),
          tabBarLabel: 'MENU',
        }}
      />
      <Tab.Screen
        name='Fridges'
        component={Fridges}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={fridgeIcon}
              style={[styles.icon, { tintColor: focused ? colors.cyberYellow : colors.silverMetallic }]}
            />
          ),
          tabBarLabel: 'FRIDGES',
        }}
      />
      <Tab.Screen
        name='Shopping Lists'
        component={ShoppingLists}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={listIcon}
              style={[styles.icon, { tintColor: focused ? colors.cyberYellow : colors.silverMetallic }]}
            />
          ),
          tabBarLabel: 'SHOPPING LISTS',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default BottomNavigator;
