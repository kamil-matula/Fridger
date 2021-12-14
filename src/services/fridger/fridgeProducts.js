import { fridgerApi } from './fridgerApi';

const fridgeProductsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    // fridgeProducts: builder.query({
    //   query: () => ({
    //     url: 'fridges-products',
    //     method: 'GET',
    //   }),
    //   providesTags: ['FridgeProducts'],
    // }),
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
      // TODO: Remove 'SpecificFridge' after implementing GET
      invalidatesTags: ['FridgeProducts', 'SpecificFridge'],
    }),
  }),
});

export const {
  // useFridgeProdcutsQuery,
  useAddFridgeProductMutation,
} = fridgeProductsApi;
