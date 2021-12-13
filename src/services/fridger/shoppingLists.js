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
    specificShoppingList: builder.query({
      query: (id) => ({
        url: `shopping-lists/${id}`,
        method: 'GET',
      }),
      providesTags: ['SpecificShoppingList'],
    }),
    addShoppingList: builder.mutation({
      query: ({ name, fridge }) => {
        body = { name };
        if (fridge) body.fridge = fridge;

        return {
          url: `shopping-lists`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['ShoppingLists'],
    }),
    editShoppingListName: builder.mutation({
      query: ({ id, name }) => ({
        url: `shopping-lists/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['ShoppingLists', 'SpecificShoppingList'],
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
  useSpecificShoppingListQuery,
  useAddShoppingListMutation,
  useEditShoppingListNameMutation,
  useDeleteShoppingListMutation,
} = shoppingListApi;
