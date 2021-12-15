import { configureStore } from '@reduxjs/toolkit';

import { fridgerApi } from './fridger/fridgerApi';
import { openFoodFactsApi } from './openFoodFacts/openFoodFactsApi';
import authReducer from './authSlice';
import { unauthenticatedMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    [fridgerApi.reducerPath]: fridgerApi.reducer, // RTK Query config needs this
    [openFoodFactsApi.reducerPath]: openFoodFactsApi.reducer,
    auth: authReducer, // auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fridgerApi.middleware, // RTK Query config needs this
      openFoodFactsApi.middleware,
      unauthenticatedMiddleware // Custom middleware to handle unauthenticated use
    ),
});
