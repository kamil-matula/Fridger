import React, { useState } from 'react';

import { Image, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { Statistics } from 'screens/home';
import { fridgeTab, listTab, statisticsTab } from 'assets/icons/navigation';
import FridgeNavigator from './FridgeNavigator';
import ShoppingListNavigator from './ShoppingListNavigator';

const Tab = createMaterialBottomTabNavigator();
const BottomNavigator = () => {
  const [barPosition, setBarPosition] = useState(null);
  const styles = useStyles({ barPosition });
  const { colors } = useTheme();

  // Single tab options:
  const tabOptions = (source, tabBarLabel) => ({
    tabBarIcon: ({ focused }) => (
      <Image
        source={source}
        style={[
          styles.icon,
          {
            tintColor: focused ? colors.cyberYellow : colors.silverMetallic,
          },
        ]}
      />
    ),
    tabBarLabel,
  });

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => {
        // Measure only after first build:
        if (!barPosition) setBarPosition(e.nativeEvent.layout.height);
      }}
    >
      <Tab.Navigator
        activeColor={colors.cyberYellow}
        barStyle={styles.bar}
        inactiveColor={colors.silverMetallic}
        shifting={false}
        backBehavior='none'
        initialRouteName='Fridges'
      >
        {/* FRIDGES, FRIDGE DETAILS */}
        <Tab.Screen
          name='Fridges'
          component={FridgeNavigator}
          options={tabOptions(fridgeTab, 'FRIDGES')}
        />

        {/* SHOPPING LISTS, SHOPPING LIST DETAILS */}
        <Tab.Screen
          name='Shopping Lists'
          component={ShoppingListNavigator}
          options={tabOptions(listTab, 'SHOPPING LISTS')}
        />

        {/* STATISTICS */}
        <Tab.Screen
          name='Statistics'
          component={Statistics}
          options={tabOptions(statisticsTab, 'STATISTICS')}
        />
      </Tab.Navigator>
    </View>
  );
};

const useStyles = makeStyles((theme, { barPosition }) => ({
  bar: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    top: barPosition ? barPosition - 54 : null, // 54 is height of navbar
  },
  icon: {
    width: 20,
    height: 20,
  },
}));

export default BottomNavigator;
