import { fridgerApi } from './fridgerApi';

const ShoppingListOwnershipsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    shoppingListOwnerships: builder.query({
      query: (id) => ({
        url: `shopping-lists/${id}/ownerships`,
        method: 'GET',
      }),
      providesTags: ['ShoppingListOwnership'],
    }),
    addShoppingListUser: builder.mutation({
      query: ({ userId, containerId, permissionName }) => ({
        url: 'shopping-lists-ownerships',
        method: 'POST',
        body: {
          user: userId,
          shopping_list: containerId,
          permission: permissionName,
        },
      }),
      invalidatesTags: ['ShoppingListOwnership', 'Friends', 'ShoppingLists'],
    }),
    updateShoppingListPermission: builder.mutation({
      query: ({ modelId, permissionName }) => ({
        url: `shopping-lists-ownerships/${modelId}`,
        method: 'PATCH',
        body: {
          permission: permissionName,
        },
      }),
      invalidatesTags: ['ShoppingListOwnership'],
    }),
    removeShoppingListUser: builder.mutation({
      query: (id) => ({
        url: `shopping-lists-ownerships/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShoppingListOwnership', 'Friends', 'ShoppingLists'],
    }),
  }),
});

export const {
  useShoppingListOwnershipsQuery,
  useUpdateShoppingListPermissionMutation,
  useAddShoppingListUserMutation,
  useRemoveShoppingListUserMutation,
} = ShoppingListOwnershipsApi;
