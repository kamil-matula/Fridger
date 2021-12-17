import { fridgerApi } from './fridgerApi';

const fridgesOwnershipsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    fridgeOwnerships: builder.query({
      query: (id) => ({
        url: `fridges/${id}/ownerships`,
        method: 'GET',
      }),
      providesTags: ['FridgeOwnership'],
    }),
    addFridgeUser: builder.mutation({
      query: ({ userId, containerId, permissionName }) => ({
        url: 'fridges-ownerships',
        method: 'POST',
        body: {
          user: userId,
          fridge: containerId,
          permission: permissionName,
        },
      }),
      invalidatesTags: ['FridgeOwnership', 'Friends'],
    }),
    updateFridgePermission: builder.mutation({
      query: ({ modelId, permissionName }) => ({
        url: `fridges-ownerships/${modelId}`,
        method: 'PATCH',
        body: {
          permission: permissionName,
        },
      }),
      invalidatesTags: ['FridgeOwnership'],
    }),
    removeFridgeUser: builder.mutation({
      query: (id) => ({
        url: `fridges-ownerships/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FridgeOwnership', 'Friends'],
    }),
  }),
});

export const {
  useFridgeOwnershipsQuery,
  useUpdateFridgePermissionMutation,
  useAddFridgeUserMutation,
  useRemoveFridgeUserMutation,
} = fridgesOwnershipsApi;
