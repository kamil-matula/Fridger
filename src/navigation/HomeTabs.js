import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Menu, Fridges, ShoppingLists } from '../screens';

const Tab = createMaterialBottomTabNavigator();
const HomeTabs = () => {
  const colors = useTheme().colors;

  return (
    <Tab.Navigator
      activeColor={colors.activeTab}
      barStyle={{ backgroundColor: colors.primary }}
      inactiveColor={colors.inactiveTab}
      shifting={false}
      backBehavior='none'
      initialRouteName='Menu'
    >
      <Tab.Screen
        name='Menu'
        component={Menu}
        options={{ tabBarIcon: 'widgets', tabBarLabel: 'MENU' }}
      />
      <Tab.Screen
        name='Fridges'
        component={Fridges}
        options={{ tabBarIcon: 'fridge', tabBarLabel: 'FRIDGES' }}
      />
      <Tab.Screen
        name='Shopping Lists'
        component={ShoppingLists}
        options={{ tabBarIcon: 'basket', tabBarLabel: 'SHOPPING LISTS' }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
