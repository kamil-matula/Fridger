import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from './authSlice';

// middleware which logout user and removes token when fetch
// returns HTTP 401 (Unathorized)
export const unauthenticatedMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      AsyncStorage.removeItem('token').then(() => dispatch(logout()));
    }
    return next(action);
  };
