import { fridgerApi } from './fridgerApi';

// TODO: Add producer to 'addFridgeProduct' and 'editFridgeProduct',
// TODO: Remove 'SpecificFridge' tag after implementing GET
const fridgeProductsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    fridgeProducts: builder.query({
      query: () => ({
        url: 'fridges-products',
        method: 'GET',
      }),
      providesTags: ['FridgeProducts'],
    }),
    addFridgeProduct: builder.mutation({
      query: ({
        name,
        barcode,
        image,
        fridge,
        expiration,
        unit,
        quantity,
      }) => ({
        url: 'fridges-products',
        method: 'POST',
        body: {
          name,
          barcode,
          image,
          fridge,
          expiration_date: expiration,
          quantity_type: unit,
          product_history: {
            status: 'UNUSED',
            quantity,
          },
        },
      }),
      invalidatesTags: ['FridgeProducts', 'SpecificFridge'],
    }),
    editFridgeProduct: builder.mutation({
      query: ({ id, name, expiration }) => ({
        url: `fridge-products/${id}`,
        method: 'PATCH',
        body: { name, expiration_date: expiration },
      }),
      invalidatesTags: ['Fridges', 'SpecificFridge'],
    }),
    deleteFridgeProduct: builder.mutation({
      query: (id) => ({
        url: `fridge-products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fridges', 'SpecificFridge'],
    }),
    updateFridgeProductQuantity: builder.mutation({
      query: ({ product, status, quantity }) => ({
        url: 'fridges-history-products',
        method: 'POST',
        body: { product, status, quantity },
      }),
      invalidatesTags: ['Fridges', 'SpecificFridge'],
    }),
  }),
});

export const {
  useFridgeProductsQuery,
  useAddFridgeProductMutation,
  useEditFridgeProductMutation,
  useDeleteFridgeProductMutation,
  useUpdateFridgeProductQuantityMutation,
} = fridgeProductsApi;
