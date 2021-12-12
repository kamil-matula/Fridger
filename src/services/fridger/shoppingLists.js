import { fridgerApi } from './fridgerApi';

const shoppingListApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    shoppingLists: builder.query({
      query: () => ({
        url: `shopping-lists`,
        method: 'GET',
      }),
      providesTags: ['ShoppingList'],
    }),
    shoppingList: builder.query({
      query: (id) => ({
        url: `shopping-lists/${id}`,
        method: 'GET',
      }),
      providesTags: ['ShoppingListProducts'],
    }),
    addShoppingList: builder.mutation({
      query: (name) => ({
        url: `shopping-lists`,
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['ShoppingList'],
    }),
    deleteShoppingList: builder.mutation({
      query: (id) => ({
        url: `shopping-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShoppingList'],
    }),
  }),
});

export const {
  useShoppingListsQuery,
  useShoppingListQuery,
  useAddShoppingListMutation,
  useDeleteShoppingListMutation,
} = shoppingListApi;
