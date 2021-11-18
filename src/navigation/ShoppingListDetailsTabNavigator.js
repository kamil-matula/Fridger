import React, { useState } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, View } from 'react-native';

import {
  ShoppingList,
  YourShoppingList,
  ShoppingListSummary,
  ShoppingListChat,
} from 'screens/home/ShoppingList';
import { AppBar, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';
import { scanner, more, chat } from 'assets/icons';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListDetailsTabNavigator = ({ navigation }) => {
  const styles = useStyles();

  const isShared = true;
  const [fabVisible, setFabVisible] = useState(true);

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
          tabBarItemStyle: { height: 48 },
        }}
        screenListeners={{
          focus: (e) => {
            if (e.target.startsWith('List-')) {
              setFabVisible(true);
            } else if (
              e.target.startsWith('Your list-') &&
              isShared === false
            ) {
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
        <ShoppingListTab.Screen
          name='Summary'
          component={ShoppingListSummary}
        />
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
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddShoppingListProduct');
        }}
        visible={fabVisible}
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
  icon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.silverMetallic,
  },
}));

export default ShoppingListDetailsTabNavigator;
