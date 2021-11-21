/* eslint-disable camelcase */
import { fridgerApi } from './fridgerApi';

const user = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAccount: builder.mutation({
      query: ({ password }) => ({
        url: 'auth/users/me/',
        method: 'DELETE',
        body: { password },
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: 'auth/users/me/',
        method: 'GET',
      }),
    }),
    // TODO: add avatar
    updateUserInfo: builder.mutation({
      query: ({ username, first_name, last_name, can_use_real_name }) => ({
        url: 'auth/users/me/',
        method: 'PATCH',
        body: {
          username,
          first_name,
          last_name,
          can_use_real_name,
        },
      }),
    }),
  }),
});

export const {
  useDeleteAccountMutation,
  useUserInfoQuery,
  useLazyUserInfoQuery,
  useUpdateUserInfoMutation,
} = user;
