import React, { useState, useRef } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, View } from 'react-native';

import {
  ShoppingList,
  YourShoppingList,
  ShoppingListSummary,
  ShoppingListChat,
} from 'screens/home/ShoppingList';
import {
  AppBar,
  FloatingActionButton,
  BottomSheet,
  SheetRow,
} from 'components';
import { makeStyles } from 'utils';
import {
  scanner,
  more,
  chat,
  group,
  groupAdd,
  hand,
  deleteIcon,
} from 'assets/icons';
import { fridgeTab } from 'assets/icons/navigation';
import { fridgesList } from 'tmpData';

const ShoppingListTab = createMaterialTopTabNavigator();
const ShoppingListDetailsTabNavigator = ({ navigation }) => {
  const styles = useStyles();

  const isShared = true;
  const [fabVisible, setFabVisible] = useState(true);

  const activeFridge = fridgesList[0];
  const bottomSheet = useRef(null);

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
          bottomSheet.current.open();
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
      {/* Shopping list actions */}
      <BottomSheet reference={bottomSheet}>
        <SheetRow
          icon={groupAdd}
          text='Share'
          onPress={() => {
            // Hide bottom sheet and change screen:
            bottomSheet.current.close();
            navigation.navigate('Share', {
              // TODO: Add passing data from Shopping Lists page
              type: 'shoppingList',
              containerID: 1,
            });
          }}
        />
        <SheetRow
          icon={group}
          text='Manage people'
          onPress={() => {
            // Hide bottom sheet and change screen:
            bottomSheet.current.close();
            navigation.navigate('EditPermissions', {
              // TODO: Add passing data from Shopping Lists page
              type: 'shoppingList',
              containerID: 1,
            });
          }}
        />
        <SheetRow
          icon={hand}
          text='Dibs'
          onPress={() => {
            // TODO: Add dibs feature
          }}
        />
        <SheetRow
          icon={fridgeTab}
          text='Change fridge'
          subText={activeFridge ? `   •   ${activeFridge.name}` : null}
          onPress={() => {
            // Hide bottom sheet and change screen:
            bottomSheet.current.close();
            navigation.navigate('ChooseFridge', {
              activeFridgeName: activeFridge ? activeFridge.name : null,
            });
          }}
        />
        <SheetRow
          icon={deleteIcon}
          text='Delete List'
          onPress={() => {
            // TODO: Add deleting shopping list
          }}
        />
      </BottomSheet>
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
