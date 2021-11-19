import { createSlice } from '@reduxjs/toolkit';
import { fridgerApi } from './fridger/fridgerApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, token: null },
  reducers: {
    loadToken: (state, action) => {
      state.token = action.payload;
    },
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        fridgerApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.isAuthenticated = true;
          state.token = payload.auth_token;
        }
      )
      .addMatcher(fridgerApi.endpoints.logout.matchFulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export default authSlice.reducer;

export const { loadToken, logout, authenticate } = authSlice.actions;
