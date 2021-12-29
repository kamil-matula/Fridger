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
      transformResponse: (rawData) =>
        // Convert data for frontend purposes:
        rawData.map((element) => {
          element.quantity_type = (
            element.quantity_type === 'PIECE' ? 'pcs' : element.quantity_type
          ).toLowerCase();
          element.expiration_date = element.expiration_date
            ?.split('-')
            .reverse()
            .join('.');
          return element;
        }),
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
          product_history: {
            status: 'UNUSED',
            quantity,
          },
          // Convert data for backend purposes ('dd.mm.YYYY -> YYYY-mm-dd, ...
          expiration_date:
            expiration !== ''
              ? expiration?.split('.').reverse().join('-')
              : null,
          // ... pcs -> PIECE, ml -> ML, g -> G, kg -> KG, l - L):
          quantity_type: (unit === 'pcs' ? 'PIECE' : unit).toUpperCase(),
        },
      }),
      invalidatesTags: ['Fridges', 'FridgeProducts'],
    }),
    editFridgeProduct: builder.mutation({
      query: ({ id, name, producer, expiration }) => ({
        url: `fridges-products/${id}`,
        method: 'PATCH',
        body: {
          name,
          producer_name: producer,
          // Convert data for backend purposes ('dd.mm.YYYY -> YYYY-mm-dd):
          expiration_date: expiration?.split('.').reverse().join('-'),
        },
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
        body: {
          product,
          quantity,
          status: ((value) => {
            if (value === 'eaten') return 'USED';
            if (value === 'wasted') return 'WASTED';
            if (value === 'disappeared') return 'UNTRACKED';
            return '';
          })(status),
        },
      }),
      invalidatesTags: ['Fridges', 'FridgeProducts', 'Statistics'],
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
