import { configureStore } from '@reduxjs/toolkit';

import { fridgerApi } from './fridger/fridgerApi';
import authReducer from './authSlice';
import { unauthenticatedMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    [fridgerApi.reducerPath]: fridgerApi.reducer, // RTK Query config needs this
    auth: authReducer, // auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fridgerApi.middleware, // RTK Query config needs this
      unauthenticatedMiddleware // Custom middleware to handle unauthenticated use
    ),
});
