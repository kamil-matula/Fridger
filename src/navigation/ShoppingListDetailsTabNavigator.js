import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import {
  ShoppingList,
  YourShoppingList,
  ShoppingListSummary,
  ShoppingListChat,
} from 'screens/home/ShoppingList';
import { AppBar, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';
import { scanner, more } from 'assets/icons';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListDetailsTabNavigator = ({ navigation }) => {
  const styles = useStyles();

  const isShared = true;

  // TODO: Change tab items size. Tab navigator is poorly documented.
  return (
    <View style={styles.container}>
      <AppBar
        label='Shopping Lists'
        icon1={scanner}
        icon2={more}
        onPressIcon1={() => {
          navigation.navigate('ShoppingListScanner');
        }}
        onPressIcon2={() => {
          // TODO: Open bottom sheet;
        }}
      />
      <ShoppingListTab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarContentContainerStyle: styles.contentContainer,
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: styles.indicator,
        }}
      >
        {isShared && (
          <ShoppingListTab.Screen name='List' component={ShoppingList} />
        )}
        <ShoppingListTab.Screen name='Your list' component={YourShoppingList} />
        <ShoppingListTab.Screen
          name='Summary'
          component={ShoppingListSummary}
        />
        {isShared && (
          <ShoppingListTab.Screen name='Chat' component={ShoppingListChat} />
        )}
      </ShoppingListTab.Navigator>
      {/* TODO: Show only on Shopping list tab   */}
      {/* or on your list when isShared is false */}
      <FloatingActionButton
        onPress={() => {
          // TODO: Show bottom sheet
        }}
      />
    </View>
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

export default ShoppingListDetailsTabNavigator;
