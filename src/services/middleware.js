import AsyncStorage from '@react-native-async-storage/async-storage';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logout } from './authSlice';

// Middleware which logs user out and removes token when fetching
// returns HTTP 401 (Unauthorized)
export const unauthenticatedMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      AsyncStorage.removeItem('token').then(() => dispatch(logout()));
    }
    return next(action);
  };
