import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Menu, Fridges, ShoppingLists } from '../screens/home';
import { Image } from 'react-native';

import menuIcon from '../../assets/images/menu.png'; 
import fridgeIcon from '../../assets/images/fridge.png'; 
import listIcon from '../../assets/images/list.png'; 

const Tab = createMaterialBottomTabNavigator();
const BottomNavigator = () => {
  const colors = useTheme().colors;

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
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? colors.cyberYellow : colors.silverMetallic,
              }}
            />
          ),
          tabBarLabel: 'MENU',
        }}
      />
      <Tab.Screen
        name='Fridges'
        component={Fridges}
        options={{ tabBarIcon: ({ focused }) => (
          <Image
            source={fridgeIcon}
            style={{
              width: 20,
              height: 20,
              tintColor: focused ? colors.cyberYellow : colors.silverMetallic,
            }}
          />
        ), tabBarLabel: 'FRIDGES' }}
      />
      <Tab.Screen
        name='Shopping Lists'
        component={ShoppingLists}
        options={{ tabBarIcon: ({ focused }) => (
          <Image
            source={listIcon}
            style={{
              width: 20,
              height: 20,
              tintColor: focused ? colors.cyberYellow : colors.silverMetallic,
            }}
          />
        ), tabBarLabel: 'SHOPPING LISTS' }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
