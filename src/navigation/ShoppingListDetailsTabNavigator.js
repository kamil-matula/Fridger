import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PropTypes from 'prop-types';

import {
  ShoppingListAll,
  ShoppingListYour,
  ShoppingListSummary,
} from 'screens/shoppingLists/details';
import { makeStyles } from 'utils';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListDetailsTabNavigator = ({ isShared, setFabVisible }) => {
  const styles = useStyles();

  return (
    <ShoppingListTab.Navigator
      // Styling:
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarContentContainerStyle: styles.contentContainer,
        tabBarLabelStyle: styles.label,
        tabBarIndicatorStyle: styles.indicator,
        tabBarItemStyle: { height: 48 },
      }}
      // Hiding FAB:
      screenListeners={{
        focus: (e) => {
          if (e.target.startsWith('All')) {
            setFabVisible(true);
          } else if (e.target.startsWith('Your') && isShared === false) {
            setFabVisible(true);
          } else {
            setFabVisible(false);
          }
        },
      }}
    >
      {isShared && (
        <ShoppingListTab.Screen
          name='All Products'
          component={ShoppingListAll}
        />
      )}
      <ShoppingListTab.Screen
        name='Your Products'
        component={ShoppingListYour}
      />
      <ShoppingListTab.Screen name='Summary' component={ShoppingListSummary} />
    </ShoppingListTab.Navigator>
  );
};

ShoppingListDetailsTabNavigator.propTypes = {
  isShared: PropTypes.bool.isRequired,
  setFabVisible: PropTypes.func.isRequired,
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
  icon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.silverMetallic,
  },
}));

export default ShoppingListDetailsTabNavigator;
