import { fridgerApi } from './fridgerApi';

const shoppingListsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    addShoppingListProduct: builder.mutation({
      query: ({ shoppingList, name, note, price, quantity, quantityType }) => ({
        url: `shopping-list-products`,
        method: 'POST',
        body: {
          shopping_list: shoppingList,
          name,
          note,
          price,
          quantity,
          quantity_type: quantityType,
        },
      }),
      invalidatesTags: ['ShoppingListProducts'],
    }),
    editShoppingListProduct: builder.mutation({
      query: ({
        productId,
        status,
        name,
        note,
        price,
        quantity,
        quantityType,
      }) => ({
        url: `shopping-list-products/${productId}`,
        method: 'PATCH',
        body: {
          status,
          name,
          note,
          price,
          quantity,
          quantity_type: quantityType,
        },
      }),
      invalidatesTags: ['ShoppingListProducts'],
    }),
    buyProducts: builder.mutation({
      query: ({ shoppingList, products }) => ({
        url: `shopping-lists/${shoppingList}/buy-products`,
        method: 'POST',
        body: { products },
      }),
      invalidatesTags: ['ShoppingListProducts'],
    }),
    deleteShoppingListProduct: builder.mutation({
      query: ({ id }) => ({
        url: `shopping-list-products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShoppingListProducts'],
    }),
    shoppingListAllProducts: builder.query({
      query: ({ id }) => ({
        url: `shopping-lists/${id}/all-products`,
        method: 'GET',
      }),
      providesTags: ['ShoppingListProducts'],
    }),
    shoppingListYourProducts: builder.query({
      query: ({ id }) => ({
        url: `shopping-lists/${id}/your-products`,
        method: 'GET',
      }),
      providesTags: ['ShoppingListProducts'],
    }),
    shoppingListSummary: builder.query({
      query: ({ id }) => ({
        url: `shopping-lists/${id}/summary`,
        method: 'GET',
      }),
      providesTags: ['ShoppingListProducts'],
    }),
  }),
});

export const {
  useAddShoppingListProductMutation,
  useEditShoppingListProductMutation,
  useBuyProductsMutation,
  useDeleteShoppingListProductMutation,
  useShoppingListAllProductsQuery,
  useShoppingListYourProductsQuery,
  useShoppingListSummaryQuery,
} = shoppingListsApi;
