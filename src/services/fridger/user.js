import { fridgerApi } from './fridgerApi';

const usersApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAccount: builder.mutation({
      query: ({ password }) => ({
        url: 'auth/users/me',
        method: 'DELETE',
        body: { current_password: password },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: 'auth/users/me/change-password',
        method: 'POST',
        body: { current_password: currentPassword, new_password: newPassword },
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: 'auth/users/me',
        method: 'GET',
      }),
      providesTags: ['User'],
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
          url: 'auth/users/me',
          method: 'PATCH',
          headers: { 'Content-type': 'multipart/form-data' },
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    findUser: builder.query({
      query: (username) => ({
        url: `users/${username}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useDeleteAccountMutation,
  useChangePasswordMutation,
  useUserInfoQuery,
  useLazyUserInfoQuery,
  useUpdateUserInfoMutation,
  useLazyFindUserQuery,
} = usersApi;
