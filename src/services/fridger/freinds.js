import { fridgerApi } from './fridgerApi';

const friends = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    friends: builder.query({
      query: (page = 0) => ({
        url: `friends/?page=${page}`,
        method: 'GET',
      }),
    }),
    addToFriends: builder.mutation({
      query: ({ username }) => ({
        url: 'friends',
        method: 'POST',
        body: { username },
      }),
    }),
    deleteFriend: builder.mutation({
      query: ({ id }) => ({
        url: `friends/${id}/`,
        method: 'DELETE',
      }),
    }),
    acceptFriend: builder.mutation({
      query: ({ id }) => ({
        url: `friends/${id}/accept`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useFriendsQuery,
  useAddToFriendsMutation,
  useDeleteFriendMutation,
  useAcceptFriendMutation,
} = friends;
