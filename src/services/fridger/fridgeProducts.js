import { fridgerApi } from './fridgerApi';

const fridgeProductsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    fridgeProducts: builder.query({
      query: ({ fridge, ordering }) => ({
        url: 'fridges-products',
        method: 'GET',
        params: {
          fridge,
          ordering,
        },
      }),
      providesTags: ['FridgeProducts'],
    }),
    addFridgeProduct: builder.mutation({
      query: ({
        name,
        producer,
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
          producer_name: producer,
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
      invalidatesTags: ['Fridges', 'FridgeProducts'],
    }),
    editFridgeProduct: builder.mutation({
      query: ({ id, name, producer, expiration }) => ({
        url: `fridges-products/${id}`,
        method: 'PATCH',
        body: { name, producer_name: producer, expiration_date: expiration },
      }),
      invalidatesTags: ['FridgeProducts'],
    }),
    deleteFridgeProduct: builder.mutation({
      query: (id) => ({
        url: `fridges-products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fridges', 'FridgeProducts'],
    }),
    updateFridgeProductQuantity: builder.mutation({
      query: ({ product, status, quantity }) => ({
        url: 'fridges-history-products',
        method: 'POST',
        body: { product, status, quantity },
      }),
      invalidatesTags: ['Fridges', 'FridgeProducts'],
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
