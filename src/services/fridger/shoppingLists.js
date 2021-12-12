import { fridgerApi } from './fridgerApi';

const shoppingListApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    shoppingLists: builder.query({
      query: ({ isArchived }) => ({
        url: `shopping-lists`,
        method: 'GET',
        params: { is_archived: isArchived },
      }),
      providesTags: ['ShoppingLists'],
    }),
    shoppingList: builder.query({
      query: (id) => ({
        url: `shopping-lists/${id}`,
        method: 'GET',
      }),
      providesTags: ['ShoppingList'],
    }),
    addShoppingList: builder.mutation({
      query: (name) => ({
        url: `shopping-lists`,
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['ShoppingLists'],
    }),
    editShoppingListName: builder.mutation({
      query: ({ id, name }) => ({
        url: `shopping-lists/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['ShoppingLists', 'ShoppingList'],
    }),
    deleteShoppingList: builder.mutation({
      query: (id) => ({
        url: `shopping-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShoppingLists'],
    }),
  }),
});

export const {
  useShoppingListsQuery,
  useShoppingListQuery,
  useAddShoppingListMutation,
  useEditShoppingListNameMutation,
  useDeleteShoppingListMutation,
} = shoppingListApi;
