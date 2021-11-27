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
      providesTags: ['UserInfo'],
    }),
    updateUserInfo: builder.mutation({
      query: ({ username, firstName, lastName, avatar, canUseRealName }) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('avatar', {
          type: 'image/png',
          uri: avatar,
          name: `${username}.png`,
        });
        formData.append('can_use_real_name', canUseRealName);
        return {
          url: 'auth/users/me/',
          method: 'PATCH',
          headers: { 'Content-type': 'multipart/form-data' },
          body: formData,
        };
      },
      invalidatesTags: ['UserInfo'],
    }),
  }),
});

export const {
  useDeleteAccountMutation,
  useUserInfoQuery,
  useLazyUserInfoQuery,
  useUpdateUserInfoMutation,
} = user;