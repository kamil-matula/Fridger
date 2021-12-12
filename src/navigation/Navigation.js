import React, { useEffect } from 'react';

import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';

import { Login, ResetPassword, Register, RegisterFeedback } from 'screens/auth';
import {
  AddShoppingList,
  ChooseFridge,
  AddShoppingListProduct,
} from 'screens/shoppingLists';
import {
  AddFridge,
  AddProductAutomat,
  AddProductManual,
  ProductDetails,
} from 'screens/fridges';
import {
  FriendProfile,
  AddFriend,
  ShareFridge,
  ShareShoppingList,
  EditPermissionsFridge,
  EditPermissionsShoppingList,
} from 'screens/friends';
import {
  EditProfile,
  ChangePassword,
  Friends,
  DeleteAccount,
} from 'screens/drawer';
import NoConnection from 'screens/NoConnection';
import DrawerNavigator from './DrawerNavigator';

const Navigation = () => (
  <NavigationContainer>
    <RootStackNavigator />
  </NavigationContainer>
);

const RootStack = createStackNavigator();
const RootStackNavigator = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  // Changing screens if network changed:
  useEffect(() => {
    // Move to valid stack if there is internet connection,
    // move to No Internet Screen if there is no internet connection,
    // do nothing on init (when isInternetReachable is null):
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      navigation.dispatch(CommonActions.navigate('Internet'));
    } else if (
      netInfo.isConnected === false ||
      netInfo.isInternetReachable === false
    ) {
      navigation.dispatch(CommonActions.navigate('NoInternet'));
    }
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Internet'
    >
      <RootStack.Screen name='Internet' component={MainStackNavigator} />
      <RootStack.Screen name='NoInternet' component={NoConnection} />
    </RootStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const MainStackNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          {/* LEVEL 1 (BOTTOM TABS) & LEVEL 2 (FRIDGE/LIST DETAILS) */}
          <MainStack.Screen
            name='DrawerNavigator'
            component={DrawerNavigator}
          />

          {/* LEVEL 2 (DRAWER + ADDING NEW STUFF) */}
          <MainStack.Screen name='EditProfile' component={EditProfile} />
          <MainStack.Screen name='ChangePassword' component={ChangePassword} />
          <MainStack.Screen name='Friends' component={Friends} />
          <MainStack.Screen name='DeleteAccount' component={DeleteAccount} />
          <MainStack.Screen name='AddFridge' component={AddFridge} />
          <MainStack.Screen
            name='AddShoppingList'
            component={AddShoppingList}
          />
          <MainStack.Screen name='AddFriend' component={AddFriend} />
          <MainStack.Screen name='FriendProfile' component={FriendProfile} />

          {/* LEVEL 3 */}
          <MainStack.Screen name='ShareFridge' component={ShareFridge} />
          <MainStack.Screen
            name='ShareShoppingList'
            component={ShareShoppingList}
          />
          <MainStack.Screen
            name='EditPermissionsFridge'
            component={EditPermissionsFridge}
          />
          <MainStack.Screen
            name='EditPermissionsShoppingList'
            component={EditPermissionsShoppingList}
          />
          <MainStack.Screen
            name='AddProductManual'
            component={AddProductManual}
          />
          <MainStack.Screen
            name='AddProductAutomat'
            component={AddProductAutomat}
          />
          <MainStack.Screen name='ProductDetails' component={ProductDetails} />
          <MainStack.Screen
            name='AddShoppingListProduct'
            component={AddShoppingListProduct}
          />
          <MainStack.Screen name='ChooseFridge' component={ChooseFridge} />
        </>
      ) : (
        <>
          {/* BEFORE AUTHENTICATION */}
          <MainStack.Screen name='Login' component={Login} />
          <MainStack.Screen name='ResetPassword' component={ResetPassword} />
          <MainStack.Screen name='Register' component={Register} />
          <MainStack.Screen
            name='RegisterFeedback'
            component={RegisterFeedback}
          />
        </>
      )}
    </MainStack.Navigator>
  );
};

export default Navigation;
