import { fridgerApi } from './fridgerApi';

const friends = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    friends: builder.query({
      query: (isAccepted) => ({
        url: `friends/?is_accepted=${isAccepted}`,
        method: 'GET',
      }),
      providesTags: ['Friends'],
    }),
    addToFriends: builder.mutation({
      query: ({ username }) => ({
        url: 'friends',
        method: 'POST',
        body: { username },
      }),
      invalidatesTags: ['Friends'],
    }),
    deleteFriend: builder.mutation({
      query: (id) => ({
        url: `friends/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Friends'],
    }),
    acceptFriend: builder.mutation({
      query: (id) => ({
        url: `friends/${id}/accept`,
        method: 'POST',
      }),
      invalidatesTags: ['Friends'],
    }),
  }),
});

export const {
  useFriendsQuery,
  useAddToFriendsMutation,
  useDeleteFriendMutation,
  useAcceptFriendMutation,
} = friends;
