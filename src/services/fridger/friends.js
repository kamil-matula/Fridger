/* eslint-disable no-param-reassign */
import { fridgerApi } from './fridgerApi';

const friendsApi = fridgerApi.injectEndpoints({
  endpoints: (builder) => ({
    friends: builder.query({
      query: ({ isAccepted, fridgeId, shoppingListId }) => {
        isAccepted = isAccepted === undefined ? '' : isAccepted;
        fridgeId = fridgeId === undefined ? '' : fridgeId;
        shoppingListId = shoppingListId === undefined ? '' : shoppingListId;
        return {
          url: `friends`,
          method: 'GET',
          params: {
            is_accepted: isAccepted,
            not_in_fridge: fridgeId,
            not_in_shopping_list: shoppingListId,
          },
        };
      },
      providesTags: ['Friends'],
    }),
    addToFriends: builder.mutation({
      query: (id) => ({
        url: 'friends',
        method: 'POST',
        body: { friend_to_add: id },
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
} = friendsApi;
