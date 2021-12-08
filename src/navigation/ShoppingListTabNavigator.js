import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import {
  ShoppingListsActive,
  ShoppingListsHistory,
} from 'screens/shoppingLists';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListTabNavigator = ({ setFabVisible }) => {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <ShoppingListTab.Navigator
      // Styling:
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarContentContainerStyle: styles.contentContainer,
        tabBarLabelStyle: styles.label,
        tabBarIndicatorStyle: styles.indicator,
      }}
      sceneContainerStyle={{ backgroundColor: colors.background }}
      // Hiding FAB:
      screenListeners={{
        focus: (e) => {
          if (e.target.startsWith('Active')) {
            setFabVisible(true);
          } else {
            setFabVisible(false);
          }
        },
      }}
    >
      <ShoppingListTab.Screen name='Active' component={ShoppingListsActive} />
      <ShoppingListTab.Screen name='History' component={ShoppingListsHistory} />
    </ShoppingListTab.Navigator>
  );
};

ShoppingListTabNavigator.propTypes = {
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
}));

export default ShoppingListTabNavigator;
