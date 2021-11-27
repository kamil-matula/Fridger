import React, { useState } from 'react';

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
} from 'components';
import { makeStyles } from 'utils';
import { copy, done, clear, deleteIcon } from 'assets/icons';
import { requestsList, friendsList } from 'tmpData';

const Friends = ({ navigation }) => {
  const theme = useTheme();
  const styles = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [userID, setUserID] = useState('497 458 417');
  const [requests, setRequests] = useState(requestsList);
  const [friends, setFriends] = useState(friendsList);
  const [rejected, setRejected] = useState(null);

  // Removing friend from list - preparation:
  const [toRemove, setToRemove] = useState(null);
  const [toRemoveNick, setToRemoveNick] = useState('');
  const prepareToRemove = (friend) => {
    // Display dialog with appropriate data:
    setToRemove(friend);
    setToRemoveNick(friend.nick);
    setDialogVisible(true);
  };

  // Removing friend from list - main methods:
  const [dialogVisible, setDialogVisible] = useState(null);
  const removeFriend = () => {
    // Remove a friend with given id:
    const idx = friends.findIndex((e) => e.id === toRemove.id);
    setFriends([...friends.splice(0, idx), ...friends.splice(idx + 1)]);

    // TODO: Send request to API to remove friend globally instead of locally

    // Hide dialog:
    setDialogVisible(false);
  };

  const cancelRemoveFriend = () => {
    // Hide dialog:
    setDialogVisible(false);
  };

  // Navigation:
  const navigateToFriendProfile = (user) => {
    navigation.navigate('FriendProfile', {
      userID: user.id,
      nick: user.nick,
      name: user.name,
      surname: user.surname,
      avatarUri: user.avatar,
    });
  };
  const navigateToAddFriend = () => {
    navigation.navigate('AddFriend');
  };

  // Displaying snackbar with information about removed request:
  const [snackbarVisible, setSnackbarVisible] = useState(null);
  const onDismissSnackBar = () => setSnackbarVisible(false);
  const undo = () => {
    // Add rejected request back to the list:
    setRequests([...requests, rejected]);

    // TODO: Send request to API to revert changes
    // OR send request to API to reject invitation
    // only after snackbar disappears (in onDismissSnackBar method)

    // Hide snackbar:
    setSnackbarVisible(false);
  };

  // Removing invitations:
  const reject = (id) => {
    // Remove invitation of a friend with given id:
    const idx = requests.findIndex((e) => e.id === id);
    const element = requests[idx];
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);

    // Store it in variable for potential UNDO action:
    setRejected(element);

    // TODO: Send request to API to remove invitation globally instead of locally
    // (potentially should be done in onDismissSnackBar method)

    // Show snackbar to make this action revertable:
    setSnackbarVisible(true);
  };

  // Accepting invitations:
  const accept = (id) => {
    // Remove invitation of a friend with given id:
    const idx = requests.findIndex((e) => e.id === id);
    const element = requests[idx];
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);

    // Add friend with given id to friends list:
    setFriends([element, ...friends]);

    // TODO: Send request to API to accept invitation globally instead of locally
  };

  // Saving user ID in clipboard:
  const copyToClipboard = () => {
    Clipboard.setString(userID);

    const msg = 'Copied to clipboard!';
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar label='friends' />
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
            {requests.map((e) => (
              <UserInfo
                key={e.id}
                title={e.nick}
                subtitle={
                  e.name ? `${e.name} ${e.surname ? e.surname : ''}` : null
                }
                avatarURI={e.avatar}
                onClick={() => navigateToFriendProfile(e)}
                variant='small'
                icon1={clear}
                onPressIcon1={() => reject(e.id)}
                iconTint1={theme.colors.tartOrange}
                icon2={done}
                onPressIcon2={() => accept(e.id)}
                iconTint2={theme.colors.darkGreen}
              />
            ))}
          </>
        )}

        {/* Existing friends */}
        <Divider />
        {friends.map((e) => (
          <UserInfo
            key={e.id}
            title={e.nick}
            subtitle={e.name ? `${e.name} ${e.surname ? e.surname : ''}` : null}
            avatarURI={e.avatar}
            onClick={() => navigateToFriendProfile(e)}
            variant='small'
            icon1={deleteIcon}
            onPressIcon1={() => prepareToRemove(e)}
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
