import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const openFoodFactsApi = createApi({
  reducerPath: 'openFoodFactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://world.openfoodfacts.org/api/v0`,
  }),
  endpoints: (builder) => ({
    product: builder.query({
      query: (barCode) => ({
        url: `product/${barCode}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useProductQuery, useLazyProductQuery } = openFoodFactsApi;
