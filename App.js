import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from 'react-redux';

import { Navigation } from 'navigation';
import { CustomTheme } from 'theme';
import { loadToken, authenticate } from 'services/authSlice';
import { store } from 'services/store';
import { useLazyUserInfoQuery } from 'services/fridger/auth';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  AsyncStorage.setItem('token', '4bfb31757bd7a8cbeabea2c03943483e678135a0');
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
  }, [fetchUserInfo, dispatch]);

  useEffect(() => {
    if (isUninitialized || isLoading) return;
    if (isSuccess) {
      dispatch(authenticate());
    }
    setIsAppLoading(false);
  }, [isSuccess, dispatch, setIsAppLoading, isUninitialized, isLoading]);

  useEffect(() => {
    const updateToken = async () => {
      if (token) {
        await AsyncStorage.setItem('token', token);
      } else {
        await AsyncStorage.removeItem('token');
      }
    };
    if (isUninitialized || isLoading) return;
    updateToken();
  }, [token, isUninitialized, isLoading]);

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
