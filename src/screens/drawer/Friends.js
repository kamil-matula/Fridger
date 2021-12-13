import React, { useState, useEffect, useMemo } from 'react';

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
import { displayToast, makeStyles } from 'utils';
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
  const deleteFriendQuery = useDeleteFriendMutation()[0];
  const acceptFriendQuery = useAcceptFriendMutation()[0];
  const requests = useFriendsQuery(false);
  const friends = useFriendsQuery(true);

  // Local data:
  const [localRequests, setLocalRequests] = useState([]);
  const [localFriends, setLocalFriends] = useState([]);
  useEffect(() => {
    if (requests.data) {
      setLocalRequests(requests.data.map((e) => e.friend));
    }
  }, [requests.data]);
  useEffect(() => {
    if (friends.data) {
      setLocalFriends(friends.data.map((e) => e.friend));
    }
  }, [friends.data]);

  // Remove friend:
  const [toRemove, setToRemove] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(null);
  const prepareToRemove = (friend) => {
    setToRemove(friend);
    setDialogVisible(true);
  };

  const deleteInvitation = (id) => {
    // Find relationship:
    const relationship = requests.data.find((e) => e.friend.id === id);

    // Send request to api:
    deleteFriendQuery(relationship.id).catch(() => {
      // Revert changes:
      if (requests.data) {
        setLocalRequests(requests.data.map((e) => e.friend));
      }

      // Display error:
      displayToast('Unable to remove invitation');
    });
  };

  const deleteFriend = (id) => {
    // Find relationship:
    const relationship = friends.data.find((e) => e.friend.id === id);

    // Send request to api:
    deleteFriendQuery(relationship.id).catch(() => {
      // Display error:
      displayToast('Unable to remove friend');
    });
  };

  const confirmRemoveFriend = () => {
    // Send request to API:
    deleteFriend(toRemove.id);

    // Hide dialog:
    setDialogVisible(false);
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
      deleteInvitation(rejected.id);
    }

    // Hide snackbar:
    setRejectCanceled(false);
    setSnackbarVisible(false);
  };

  // Accept invitation:
  const acceptInvitation = (id) => {
    // Find relationship:
    const relationship = requests.data.find((e) => e.friend.id === id);

    // Send request to API:
    acceptFriendQuery(relationship.id)
      .unwrap()
      .catch(() => displayToast('Unable to accept invitation'));
  };

  const rejectInvitation = (id) => {
    // Reject invitation locally:
    const idx = localRequests.findIndex((e) => e.id === id);
    setRejected(localRequests[idx]);

    // Give a chance to undo & send request to API on dismiss:
    setLocalRequests([
      ...localRequests.slice(0, idx),
      ...localRequests.slice(idx + 1),
    ]);
    setSnackbarVisible(true);
  };

  const undoRejection = () => {
    // Return original state of the list:
    if (requests.data) {
      setLocalRequests(requests.data.map((e) => e.friend));
    }

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
      <AppBar label='Friends' />
      <Divider />

      {/* Loading */}
      {requests.isLoading || friends.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          {/* Invitations */}
          {localRequests.length !== 0 && (
            <>
              <Text style={styles.header}>Pending requests</Text>
              {localRequests.map((user) => (
                <UserInfo
                  key={user.id}
                  title={user.username}
                  subtitle={`${user.first_name} ${user.last_name}`.trim()}
                  avatarURI={user.avatar}
                  onClick={() => navigateToFriendProfile(user)}
                  variant='small'
                  icon1={clear}
                  onPressIcon1={() => rejectInvitation(user.id)}
                  iconTint1={colors.tartOrange}
                  icon2={done}
                  onPressIcon2={() => acceptInvitation(user.id)}
                  iconTint2={colors.darkGreen}
                />
              ))}
            </>
          )}

          {/* Line between the lists */}
          {localRequests.length !== 0 && localFriends.length !== 0 && (
            <Divider />
          )}

          {/* Existing friends */}
          {localFriends.length !== 0 && (
            <>
              <Text style={styles.header}>Accepted requests</Text>
              {localFriends.map((user) => (
                <UserInfo
                  key={user.id}
                  title={user.username}
                  subtitle={`${user.first_name} ${user.last_name}`.trim()}
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
      )}

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
          onPress: undoRejection,
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
