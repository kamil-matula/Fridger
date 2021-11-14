import { configureStore } from '@reduxjs/toolkit';

import { fridgerApi } from './fridger/fridgerApi';
import authReducer from './authSlice';
import { unauthenticatedMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    [fridgerApi.reducerPath]: fridgerApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fridgerApi.middleware,
      unauthenticatedMiddleware
    ),
});
