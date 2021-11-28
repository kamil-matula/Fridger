import { fridgerApi } from './fridgerApi';

const authApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ email, username, password }) => ({
        url: 'auth/users',
        method: 'POST',
        body: { email, username, password },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'auth/users/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/users/logout',
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email }) => ({
        url: 'auth/users/reset_password',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useResetPasswordMutation,
} = authApi;
