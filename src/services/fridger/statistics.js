import { fridgerApi } from './fridgerApi';

const statisticsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    statistics: builder.query({
      query: () => ({
        url: `statistics`,
        method: 'GET',
      }),
      providesTags: ['Statistics'],
    }),
  }),
});

export const { useStatisticsQuery } = statisticsApi;
