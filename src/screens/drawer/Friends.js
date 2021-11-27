import React, { useEffect, useState, useMemo } from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import {
  Divider,
  Snackbar,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';

import {
  AppBar,
  UserInfo,
  Dialog,
  Separator,
  FloatingActionButton,
  LoadingOverlay,
} from 'components';
import { makeStyles } from 'utils';
import { copy, done, clear, deleteIcon } from 'assets/icons';

import {
  useFriendsQuery,
  useDeleteFriendMutation,
  useAcceptFriendMutation,
} from 'services/fridger/friends';

import { useUserInfoQuery } from 'services/fridger/user';

const Friends = ({ navigation }) => {
  const theme = useTheme();
  const styles = useStyles();

  const deleteFriend = useDeleteFriendMutation()[0];
  const acceptFriend = useAcceptFriendMutation()[0];

  // Lists
  const { data: requestsData, isLoading: requestsAreLoading } =
    useFriendsQuery(false);
  const { data: friendsData, isLoading: friendsAreLoading } =
    useFriendsQuery(true);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);

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

  // Remove friend
  const [toRemove, setToRemove] = useState(null);
  const [toRemoveNick, setToRemoveNick] = useState('');
  const [dialogVisible, setDialogVisible] = useState(null);

  const prepareToRemove = (friend) => {
    setToRemove(friend);
    setToRemoveNick(friend.username);
    setDialogVisible(true);
  };

  const removeFriend = () => {
    const idx = friends.findIndex((e) => e.id === toRemove.id);
    // Local
    setFriends([...friends.splice(0, idx), ...friends.splice(idx + 1)]);
    // Server
    deleteFriend(toRemove.id);

    setDialogVisible(false);
  };

  const cancelRemoveFriend = () => {
    setDialogVisible(false);
  };

  // Invitations
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
    if (!rejectCanceled()) {
      deleteFriend(rejected.id);
    }
    setRejectCanceled(false);
    setSnackbarVisible(false);
  };

  const accept = (id) => {
    const idx = requests.findIndex((e) => e.id === id);
    // Local
    setFriends([requests[idx], ...friends]);
    // Server
    acceptFriend(id);
    // Remove from invitation list
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);
  };

  const reject = (id) => {
    const idx = requests.findIndex((e) => e.id === id);
    // Local
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);
    // UNDO action
    setRejected(requests[idx]);
    setSnackbarVisible(true);
  };

  const undo = () => {
    // Add rejected request back to the list
    setRequests([...requests, rejected]);
    setRejectCanceled(true);
    setSnackbarVisible(false);
  };

  // User ID
  const [userID, setUserID] = useState('');
  const { data: userData } = useUserInfoQuery();

  useEffect(() => {
    setUserID(userData?.id);
  }, [userData]);

  const copyToClipboard = () => {
    Clipboard.setString(userID);

    const msg = 'Copied to clipboard!';
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
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
      <AppBar label='friends' />
      {requestsAreLoading && friendsAreLoading && <LoadingOverlay />}
      <Divider />
      <ScrollView>
        {/* My ID */}
        <Text style={styles.header}>Your ID</Text>
        <View style={styles.userID}>
          <Text style={styles.text}>{userID}</Text>
          <View style={{ borderRadius: 20, overflow: 'hidden' }}>
            <TouchableRipple onPress={copyToClipboard}>
              <Image style={styles.icon} source={copy} />
            </TouchableRipple>
          </View>
        </View>

        {/* Invitations */}
        {requests.length !== 0 && (
          <>
            <Divider />
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
                iconTint1={theme.colors.tartOrange}
                icon2={done}
                onPressIcon2={() => accept(user.id)}
                iconTint2={theme.colors.darkGreen}
              />
            ))}
          </>
        )}

        {/* Existing friends */}
        <Divider />
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
            iconTint1={theme.colors.silverMetallic}
          />
        ))}

        {/* Space for FAB */}
        <Separator height={88} />
      </ScrollView>

      {/* Deleting friend */}
      <Dialog
        title='Remove from friends'
        paragraph={`Are you sure you want to remove ${toRemoveNick} from friends? This action cannot be undone.`}
        visibilityState={[dialogVisible, setDialogVisible]}
        label1='remove'
        onPressLabel1={removeFriend}
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
