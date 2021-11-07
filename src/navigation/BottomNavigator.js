import React from 'react';

import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { Menu } from 'screens/home';
import { fridgeTab, listTab, menuTab } from 'assets/icons/navigation';
import FridgeNavigator from './FridgeNavigator';
import ShoppingListNavigator from './ShoppingListNavigator';

const Tab = createMaterialBottomTabNavigator();
const BottomNavigator = () => {
  const styles = useStyles();
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
      {/* MENU */}
      <Tab.Screen
        name='Menu'
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={menuTab}
              style={[
                styles.icon,
                {
                  tintColor: focused
                    ? colors.cyberYellow
                    : colors.silverMetallic,
                },
              ]}
            />
          ),
          tabBarLabel: 'MENU',
        }}
      />

      {/* FRIDGES, FRIDGE DETAILS */}
      <Tab.Screen
        name='Fridges'
        component={FridgeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={fridgeTab}
              style={[
                styles.icon,
                {
                  tintColor: focused
                    ? colors.cyberYellow
                    : colors.silverMetallic,
                },
              ]}
            />
          ),
          tabBarLabel: 'FRIDGES',
        }}
      />

      {/* SHOPPING LISTS, SHOPPING LIST DETAILS */}
      <Tab.Screen
        name='Shopping Lists'
        component={ShoppingListNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={listTab}
              style={[
                styles.icon,
                {
                  tintColor: focused
                    ? colors.cyberYellow
                    : colors.silverMetallic,
                },
              ]}
            />
          ),
          tabBarLabel: 'SHOPPING LISTS',
        }}
      />
    </Tab.Navigator>
  );
};

const useStyles = makeStyles(() => ({
  icon: {
    width: 20,
    height: 20,
  },
}));

export default BottomNavigator;
