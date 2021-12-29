import React, { useEffect, useRef, useState } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from 'react-redux';

import { Navigation } from 'navigation';
import { CustomTheme } from 'theme';
import { loadToken, authenticate } from 'services/authSlice';
import { store } from 'services/store';
import { useLazyUserInfoQuery } from 'services/fridger/user';
import { setShoppingListYourProducts } from 'services/shoppingListYourProductsSlice';

// Main function:
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ReduxProvider store={store}>
      {isLoading && <AppLoading />}
      <AppContent isAppLoading={isLoading} setIsAppLoading={setIsLoading} />
    </ReduxProvider>
  );
};

const AppContent = ({ isAppLoading, setIsAppLoading }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [fetchUserInfo, { isSuccess, isLoading, isUninitialized }] =
    useLazyUserInfoQuery();
  const isInit = useRef(true);

  // Init post request to check if user is authenticated with token located in storage
  useEffect(() => {
    if (!isInit.current) return;
    const initAuth = async () => {
      const localToken = await AsyncStorage.getItem('token');
      if (localToken) {
        dispatch(loadToken(localToken));
      }
      fetchUserInfo();
    };
    initAuth();
    isInit.current = false;
  }, [fetchUserInfo]);

  // Check if user is successfully authenticated and end app loading
  useEffect(() => {
    if (isUninitialized || isLoading) return;
    if (isSuccess) {
      dispatch(authenticate());
    }
    setIsAppLoading(false);
  }, [isSuccess, isUninitialized, isLoading]);

  // Update token in storage whenever value of it in redux changes
  useEffect(() => {
    const updateToken = async () => {
      if (token) {
        await AsyncStorage.setItem('token', token);
      } else {
        // Remove all data from provider (redux store):
        dispatch(setShoppingListYourProducts({ value: {} }));
        // Remove all data from local storage:
        await AsyncStorage.multiRemove(['token', 'shoppingListsProducts']);
      }
    };
    if (isUninitialized || isLoading) return;
    updateToken();
  }, [token, isUninitialized, isLoading]);

  // Store shopping lists products in AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('shoppingListsProducts').then((obj) => {
      if (obj) {
        dispatch(setShoppingListYourProducts(JSON.parse(obj)));
      }
    });

    const unsubscribe = store.subscribe(() => {
      const shoppingListsProducts = JSON.stringify(
        store.getState().shoppingListYourProducts
      );
      AsyncStorage.setItem('shoppingListsProducts', shoppingListsProducts);
    });

    return unsubscribe;
  }, []);

  // Render only if loaded:
  if (isAppLoading) return null;
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CustomTheme}>
        <StatusBar
          style='light'
          backgroundColor={CustomTheme.colors.richBlack}
        />
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

AppContent.propTypes = {
  isAppLoading: PropTypes.bool.isRequired,
  setIsAppLoading: PropTypes.func.isRequired,
};

export default App;
