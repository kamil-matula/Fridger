import React from 'react';

import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { Menu, Fridges, ShoppingLists } from 'screens/home';
import { fridgeIcon, listIcon, menuIcon } from 'assets/images/navigation';

const Tab = createMaterialBottomTabNavigator();
const BottomNavigator = () => {
  const styles = useStyles();
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
      <Tab.Screen
        name='Fridges'
        component={Fridges}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={fridgeIcon}
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
      <Tab.Screen
        name='Shopping Lists'
        component={ShoppingLists}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={listIcon}
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

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 20,
    height: 20,
  },
}));

export default BottomNavigator;
