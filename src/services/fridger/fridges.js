import { fridgerApi } from './fridgerApi';

const fridgesApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    fridges: builder.query({
      query: () => ({
        url: `fridges`,
        method: 'GET',
      }),
      providesTags: ['Fridges'],
    }),
    addFridge: builder.mutation({
      query: (name) => ({
        url: 'fridges',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Fridges'],
    }),
  }),
});

export const { useFridgesQuery, useAddFridgeMutation } = fridgesApi;
