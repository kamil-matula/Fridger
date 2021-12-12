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
    addShoppingList: builder.mutation({
      query: (name) => ({
        url: `shopping-lists`,
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['ShoppingList'],
    }),
  }),
});

export const { useShoppingListsQuery, useAddShoppingListMutation } =
  shoppingListApi;
