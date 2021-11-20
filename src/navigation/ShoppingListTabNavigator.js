import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { makeStyles } from 'utils';
import {
  ListShoppingListsActive,
  ListShoppingListsHistory,
} from 'screens/shoppingLists';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListTabNavigator = () => {
  const styles = useStyles();

  return (
    <ShoppingListTab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarContentContainerStyle: styles.contentContainer,
        tabBarLabelStyle: styles.label,
        tabBarIndicatorStyle: styles.indicator,
      }}
    >
      <ShoppingListTab.Screen
        name='Active'
        component={ListShoppingListsActive}
      />
      <ShoppingListTab.Screen
        name='History'
        component={ListShoppingListsHistory}
      />
    </ShoppingListTab.Navigator>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabBar: {
    backgroundColor: theme.colors.silverMetallic,
    height: 50,
  },
  contentContainer: {
    backgroundColor: theme.colors.background,
  },
  label: {
    color: theme.colors.text,
  },
  indicator: {
    backgroundColor: theme.colors.cyberYellow,
  },
}));

export default ShoppingListTabNavigator;
