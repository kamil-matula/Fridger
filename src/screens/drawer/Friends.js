import React, { useEffect, useState, useMemo } from 'react';

import { View, Text, ScrollView } from 'react-native';
import { useTheme, Snackbar, Divider } from 'react-native-paper';

import {
  AppBar,
  UserInfo,
  Dialog,
  Separator,
  FloatingActionButton,
  LoadingOverlay,
} from 'components';
import { makeStyles } from 'utils';
import { done, clear, deleteIcon } from 'assets/icons';

import {
  useFriendsQuery,
  useDeleteFriendMutation,
  useAcceptFriendMutation,
} from 'services/fridger/friends';

const Friends = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  // Queries:
  const deleteFriend = useDeleteFriendMutation()[0];
  const acceptFriend = useAcceptFriendMutation()[0];
  const { data: requestsData, isLoading: requestsAreLoading } = useFriendsQuery(
    { isAccepted: false }
  );
  const { data: friendsData, isLoading: friendsAreLoading } = useFriendsQuery({
    isAccepted: true,
  });

  // Lists:
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  // Update requests when data is fetched:
  useEffect(() => {
    if (requestsData) {
      setRequests(
        requestsData.map((e) => ({
          id: e.id,
          username: e.friend.username,
          firstName: e.friend.first_name,
          lastName: e.friend.last_name,
          avatar: e.friend.avatar,
        }))
      );
    }
  }, [requestsData]);

  // Update list of friends when data is fetched:
  useEffect(() => {
    if (friendsData) {
      setFriends(
        friendsData.map((e) => ({
          id: e.id,
          username: e.friend.username,
          firstName: e.friend.first_name,
          lastName: e.friend.last_name,
          avatar: e.friend.avatar,
        }))
      );
    }
  }, [friendsData]);

  // Remove friend:
  const [toRemove, setToRemove] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(null);

  const prepareToRemove = (friend) => {
    setToRemove(friend);
    setDialogVisible(true);
  };

  const confirmRemoveFriend = () => {
    // Remove friend locally:
    const idx = friends.findIndex((e) => e.id === toRemove.id);
    setFriends([...friends.splice(0, idx), ...friends.splice(idx + 1)]);

    // Send request to API:
    deleteFriend(toRemove.id);

    // Hide dialog:
    setDialogVisible(false);

    // TODO: Get rid of manipulating local data;
    // it is better to refetch data after sending request to API
  };

  const cancelRemoveFriend = () => {
    // Hide dialog:
    setDialogVisible(false);
  };

  // Reject invitation:
  const [rejected, setRejected] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(null);
  const [rejectCanceled, setRejectCanceled] = useMemo(() => {
    let state = false;
    return [
      () => state,
      (newState) => {
        state = newState;
      },
    ];
  }, []);

  const onDismissSnackBar = () => {
    // If not undone, send request to API:
    if (!rejectCanceled()) {
      deleteFriend(rejected.id);
    }

    // Hide snackbar:
    setRejectCanceled(false);
    setSnackbarVisible(false);
  };

  // Accept invitation:
  const accept = (id) => {
    // Accept invitation locally:
    const idx = requests.findIndex((e) => e.id === id);
    setFriends([requests[idx], ...friends]);
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);

    // Send request to API:
    acceptFriend(id);

    // TODO: Get rid of manipulating local data;
    // it is better to refetch data after sending request to API
  };

  const reject = (id) => {
    // Reject invitation locally:
    const idx = requests.findIndex((e) => e.id === id);
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);

    // Give a chance to undo & send request to API on dismiss:
    setRejected(requests[idx]);
    setSnackbarVisible(true);
  };

  const undo = () => {
    // Add rejected request back to the list:
    setRequests([...requests, rejected]);

    // Hide snackbar:
    setRejectCanceled(true);
    setSnackbarVisible(false);
  };

  // Navigation:
  const navigateToFriendProfile = (user) => {
    navigation.navigate('FriendProfile', {
      userID: user.id,
      nick: user.username,
      name: user.firstName,
      surname: user.lastName,
      avatarUri: user.avatar,
    });
  };
  const navigateToAddFriend = () => {
    navigation.navigate('AddFriend');
  };

  return (
    <View style={styles.container}>
      {/* Main content */}
      <AppBar label='friends' />
      <Divider />
      <ScrollView>
        {/* Invitations */}
        {requests.length !== 0 && (
          <>
            <Text style={styles.header}>Pending requests</Text>
            {requests.map((user) => (
              <UserInfo
                key={user.id}
                title={user.username}
                subtitle={`${user.firstName} ${user.lastName}`.trim()}
                avatarURI={user.avatar}
                onClick={() => navigateToFriendProfile(user)}
                variant='small'
                icon1={clear}
                onPressIcon1={() => reject(user.id)}
                iconTint1={colors.tartOrange}
                icon2={done}
                onPressIcon2={() => accept(user.id)}
                iconTint2={colors.darkGreen}
              />
            ))}
          </>
        )}

        {/* Line between the lists */}
        {requests.length !== 0 && friends.length !== 0 && <Divider />}

        {/* Existing friends */}
        {friends.length !== 0 && (
          <>
            <Text style={styles.header}>Accepted requests</Text>
            {friends.map((user) => (
              <UserInfo
                key={user.id}
                title={user.username}
                subtitle={`${user.firstName} ${user.lastName}`.trim()}
                avatarURI={user.avatar}
                onClick={() => navigateToFriendProfile(user)}
                variant='small'
                icon1={deleteIcon}
                onPressIcon1={() => prepareToRemove(user)}
                iconTint1={colors.silverMetallic}
              />
            ))}
          </>
        )}

        {/* Space for FAB */}
        <Separator height={80} />
      </ScrollView>

      {/* Loading */}
      {(requestsAreLoading || friendsAreLoading) && <LoadingOverlay />}

      {/* Deleting friend */}
      <Dialog
        title='Remove from friends'
        paragraph={`Are you sure you want to remove ${toRemove?.username} from friends? This action cannot be undone.`}
        visibilityState={[dialogVisible, setDialogVisible]}
        label1='remove'
        onPressLabel1={confirmRemoveFriend}
        label2='cancel'
        onPressLabel2={cancelRemoveFriend}
      />

      {/* Undoing request rejection */}
      <Snackbar
        style={styles.snackbar}
        duration={5000}
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'undo',
          onPress: undo,
        }}
      >
        <Text style={styles.snackbarText}>Friend request rejected</Text>
      </Snackbar>

      {/* Adding new friend */}
      {!snackbarVisible && (
        <FloatingActionButton onPress={navigateToAddFriend} />
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  text: {
    color: theme.colors.white,
    fontSize: 14,
  },
  userID: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    height: 24,
    width: 24,
    margin: 8,
    tintColor: theme.colors.silverMetallic,
  },
  snackbar: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
  },
  snackbarText: {
    color: theme.colors.white,
  },
}));

export default Friends;
