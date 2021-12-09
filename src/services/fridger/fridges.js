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
    specificFridge: builder.query({
      query: (id) => ({
        url: `fridges/${id}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    editFridgeName: builder.mutation({
      query: ({ id, name }) => ({
        url: `fridges/${id}`,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['Fridges', 'Products'],
    }),
    deleteFridge: builder.mutation({
      query: (id) => ({
        url: `fridges/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fridges'],
    }),
  }),
});

export const {
  useFridgesQuery,
  useAddFridgeMutation,
  useSpecificFridgeQuery,
  useEditFridgeNameMutation,
  useDeleteFridgeMutation,
} = fridgesApi;
