import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import { ShoppingLists } from 'screens/home';
import { AppBar, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListTabNavigator = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Shopping Lists' />
      <ShoppingListTab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarContentContainerStyle: styles.contentContainer,
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: styles.indicator,
        }}
      >
        <ShoppingListTab.Screen name='Active' component={ShoppingLists} />
        <ShoppingListTab.Screen name='History' component={ShoppingLists} />
      </ShoppingListTab.Navigator>
      {/* TODO: Hide when history tab is active. Use visible prop */}
      <FloatingActionButton
        onPress={() => navigation.navigate('AddShoppingList')}
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

export default ShoppingListTabNavigator;
