import { openFoodFactsApi } from './openFoodFactsApi';

const productApi = openFoodFactsApi.injectEndpoints({
  endpoints: (builder) => ({
    product: builder.query({
      query: (barCode) => ({
        url: `product/${barCode}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyProductQuery } = productApi;
