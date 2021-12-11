import { fridgerApi } from './fridgerApi';

const fridgesOwnershipsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    fridgeOwners: builder.query({
      query: (id) => ({
        url: `fridges/${id}/ownerships`,
        method: 'GET',
      }),
      providesTags: ['FridgeOwnership'],
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
      invalidatesTags: ['FridgeOwnership'],
    }),
    updatePermission: builder.mutation({
      query: ({ modelId, userId, fridgeId, permissionName }) => ({
        url: `fridges-ownerships/${modelId}`,
        method: 'PUT',
        body: {
          user: userId,
          fridge: fridgeId,
          permission: permissionName,
        },
      }),
      invalidatesTags: ['FridgeOwnership'],
    }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: `fridges-ownerships/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FridgeOwnership'],
    }),
  }),
});

export const {
  useLazyFridgeOwnersQuery,
  useUpdatePermissionMutation,
  useAddUserMutation,
  useRemoveUserMutation,
} = fridgesOwnershipsApi;
