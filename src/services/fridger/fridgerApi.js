import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fridgerApi = createApi({
  reducerPath: 'fridgerApi',
  tagTypes: [
    'User',
    'Friends',
    'Fridges',
    'Products',
    'FridgeOwnership',
    'ShoppingListOwnership',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://fridger-api.herokuapp.com/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});
