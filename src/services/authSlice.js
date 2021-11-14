import { createSlice } from '@reduxjs/toolkit';
import { fridgerApi } from './fridger/fridgerApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, token: null },
  reducers: {
    loadToken: (state, action) => {
      state.token = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      if (action.payload) {
        state.token = action.payload;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      fridgerApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.token = payload.token;
      }
    );
  },
});

export default authSlice.reducer;

export const { loadToken, login, logout } = authSlice.actions;
