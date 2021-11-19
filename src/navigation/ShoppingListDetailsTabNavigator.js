import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import {
  ShoppingList,
  YourShoppingList,
  ShoppingListSummary,
  ShoppingListChat,
} from 'screens/shoppingLists';
import { makeStyles } from 'utils';
import { chat } from 'assets/icons';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListDetailsTabNavigator = ({ isShared, setFabVisible }) => {
  const styles = useStyles();

  // TODO: Change tab items size. Tab navigator is poorly documented.
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
          if (e.target.startsWith('List-')) {
            setFabVisible(true);
          } else if (e.target.startsWith('Your list-') && isShared === false) {
            setFabVisible(true);
          } else {
            setFabVisible(false);
          }
        },
      }}
    >
      {isShared && (
        <ShoppingListTab.Screen name='List' component={ShoppingList} />
      )}
      <ShoppingListTab.Screen name='Your list' component={YourShoppingList} />
      <ShoppingListTab.Screen name='Summary' component={ShoppingListSummary} />
      {isShared && (
        <ShoppingListTab.Screen
          name='Chat'
          component={ShoppingListChat}
          options={{
            tabBarLabelStyle: { display: 'none' },
            tabBarIcon: () => <Image style={styles.icon} source={chat} />,
          }}
        />
      )}
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
