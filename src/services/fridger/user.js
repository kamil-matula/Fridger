/* eslint-disable object-shorthand */
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
    updateUserInfo: builder.mutation({
      query: ({ username, firstName, lastName, avatar, canUseRealName }) => ({
        url: 'auth/users/me/',
        method: 'PATCH',
        body: {
          username: username,
          first_name: firstName,
          last_name: lastName,
          avatar: avatar,
          can_use_real_name: canUseRealName,
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
