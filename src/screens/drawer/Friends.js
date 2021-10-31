import React, { useState } from 'react';

import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Divider, Snackbar, useTheme } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';

import { AppBar, UserInfo, Button, Dialog } from 'components';
import { makeStyles } from 'utils';
import { copy, done, clear, add, deleteIcon } from 'assets/icons';

import { requestsList, friendsList } from './tmpData.js';

const Friends = ({ navigation }) => {
  const theme = useTheme();
  const styles = useStyles();

  const [userID, setUserID] = useState('497 458 417');
  const [requests, setRequests] = useState(requestsList);
  const [friends, setFriends] = useState(friendsList);
  const [rejected, setRejected] = useState(null);

  const [toRemove, setToRemove] = useState(null);
  const [toRemoveNick, setToRemoveNick] = useState('');
  const prepareToRemove = (friend) => {
    setToRemove(friend);
    setToRemoveNick(friend.nick);
    setDialogVisible(true);
  };
  const removeFriend = () => {
    let idx = friends.findIndex((e) => e.id === toRemove.id);
    setFriends([...friends.splice(0, idx), ...friends.splice(idx + 1)]);
    setDialogVisible(false);
  };
  const cancelRemoveFriend = () => {
    setDialogVisible(false);
  };

  const navigateToFriendProfile = (id) => {
    navigation.push('DrawerNavigator', {
      screen: 'FriendProfile',
      params: { userID: id },
    })
  }
  const navigateToAddFriend = () => {
    navigation.push('DrawerNavigator', {
      screen: 'AddFriend',
    })
  }

  const [snackbarVisible, setSnackbarVisible] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(null);
  const onDismissSnackBar = () => setSnackbarVisible(false);

  const undo = () => {
    setRequests([...requests, rejected]);
    setSnackbarVisible(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(userID);
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
  };

  const reject = (id) => {
    let idx = requests.findIndex((e) => e.id === id);
    let element = requests[idx];
    setRejected(element);
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);
    setSnackbarVisible(true);
  };

  const accept = (id) => {
    let idx = requests.findIndex((e) => e.id === id);
    let element = requests[idx];
    setFriends([element, ...friends]);
    setRequests([...requests.splice(0, idx), ...requests.splice(idx + 1)]);
  };

  return (
    <View style={styles.container}>
      <AppBar label='friends' />
      <Divider style={styles.divider} />
      <ScrollView>
        <Text style={styles.header}>Your ID</Text>
        <View style={styles.userID}>
          <Text style={styles.text}>{userID}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Image style={styles.icon} source={copy} />
          </TouchableOpacity>
        </View>
        {requests.length != 0 && (
          <>
            <Divider style={styles.divider} />
            <Text style={styles.header}>Pending requests</Text>
            {requests.map(({ id, nick, name, surname, avatar }) => (
              <UserInfo
                key={id}
                title={nick}
                subtitle={name + ' ' + surname}
                avatarURI={avatar}
                onClick={() => navigateToFriendProfile(id)}
                variant='small'
                icon1={clear}
                onPressIcon1={() => reject(id)}
                iconTint1={theme.colors.tartOrange}
                icon2={done}
                onPressIcon2={() => accept(id)}
                iconTint2={theme.colors.darkGreen}
              />
            ))}
          </>
        )}
        <Divider style={styles.divider} />
        {friends.map((e) => (
          <UserInfo
            key={e.id}
            title={e.nick}
            subtitle={e.name + ' ' + e.surname}
            avatarURI={e.avatar}
            onClick={() => navigateToFriendProfile(id)}
            variant='small'
            icon1={deleteIcon}
            onPressIcon1={() => prepareToRemove(e)}
            iconTint1={theme.colors.silverMetallic}
          />
        ))}
      </ScrollView>
      <Button
        icon={add}
        fab={true}
        fabPosition='right'
        variant='contained'
        rounded={true}
        onPress={navigateToAddFriend}
      />
      <Dialog
        title='Remove from friends'
        paragraph={`Are you sure you want to remove ${toRemoveNick} from friends? This action cannot be undone.`}
        visibilityState={[dialogVisible, setDialogVisible]}
        label1='remove'
        onPressLabel1={removeFriend}
        label2='cancel'
        onPressLabel2={cancelRemoveFriend}
      />
      <Snackbar
        wrapperStyle={styles.snackbarWrapper}
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
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
  },
  header: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  text: {
    color: theme.colors.text,
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
    tintColor: theme.colors.silverMetallic,
  },
  snackbarWrapper: {
    paddingBottom: 88,
  },
  snackbar: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
  },
  snackbarText: {
    color: theme.colors.text,
  },
}));

export default Friends;
