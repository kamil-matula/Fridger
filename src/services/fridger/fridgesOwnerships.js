import { fridgerApi } from './fridgerApi';

const fridgesOwnershipsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    fridgeOwners: builder.query({
      query: (id) => ({
        url: `fridges/${id}/ownerships`,
        method: 'GET',
      }),
      providesTags: ['Fridges'],
    }),
    AddUser: builder.mutation({
      query: ({ userId, fridgeId, permissionName }) => ({
        url: 'fridges-ownerships',
        method: 'POST',
        body: {
          user: userId,
          fridge: fridgeId,
          permission: permissionName,
        },
      }),
      invalidatesTags: ['Fridges'],
    }),
    updatePermission: builder.mutation({
      query: ({ userId, fridgeId, permissionName }) => ({
        url: `fridges-ownerships/${id}`,
        method: 'PUT',
        body: {
          user: userId,
          fridge: fridgeId,
          permission: permissionName,
        },
      }),
    }),
    removeUser: builder.mutation({
      query: ({ userId, fridgeId, permissionName }) => ({
        url: `fridges/${id}`,
        method: 'DELETE',
        body: {
          user: userId,
          fridge: fridgeId,
          permission: permissionName,
        },
      }),
    }),
  }),
});

export const {
  useFridgeOwnersQuery,
  useUpdatePermissionMutation,
  useAddUserMutation,
  useRemoveUserMutation,
} = fridgesOwnershipsApi;
