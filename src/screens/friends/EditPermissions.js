/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';

import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, useTheme, TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';
import { UserInfo, AppBar, BottomSheet, SheetRow, Dialog } from 'components';
import { forward, deleteIcon, check } from 'assets/icons';

import { useFridgeOwnersQuery } from 'services/fridger/fridgesOwnerships';

const EditPermissions = ({ route, navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const [creator, setCreator] = useState([]);
  const [owners, setOwners] = useState([]);

  const ownersQuery = useFridgeOwnersQuery(route.params.containerID);
  // Update list of owners when data is fetched:
  useEffect(() => {
    if (ownersQuery.data) {
      setOwners(
        ownersQuery.data
          .filter((e) => {
            if (e.permission === 'CREATOR') {
              setCreator({
                id: e.user.id,
                username: e.user.username,
                firstName: e.user.first_name,
                lastName: e.user.last_name,
                avatar: e.user.avatar,
                permission: e.permission,
              });
              return false;
            }
            return true;
          })
          .map((e) => ({
            id: e.user.id,
            username: e.user.username,
            firstName: e.user.first_name,
            lastName: e.user.last_name,
            avatar: e.user.avatar,
            permission: e.permission,
          }))
      );
    }
  }, [ownersQuery.isSuccess]);

  // Changing permission - preparation:
  const [toChange, setToChange] = useState(null);
  const prepareToChangePermission = (friend) => {
    // Display bottom sheet with appropriate target:
    setToChange(friend);
    refBS.current.open();
  };

  // Changing permission - main methods:
  const refBS = useRef(null);
  const changePermission = (newPermission) => {
    // Change permissions for a friend with given id:
    const idx = owners.findIndex((e) => e.id === toChange.id);
    const changedFriend = owners[idx];
    changedFriend.permission = newPermission;
    setOwners([
      ...owners.slice(0, idx),
      changedFriend,
      ...owners.slice(idx + 1),
    ]);

    // TODO: Send request to API to change permissions globally instead of locally

    // Hide Bottom Sheet:
    refBS.current.close();
  };

  // Removing friend from list - preparation:
  const [dialogVisible, setDialogVisible] = useState(null);
  const [toRemove, setToRemove] = useState(null);
  const [toRemoveNick, setToRemoveNick] = useState('');
  const prepareToRemove = (friend) => {
    // Display dialog with appropriate data:
    setToRemove(friend);
    setToRemoveNick(friend.nick);
    setDialogVisible(true);
  };

  // Removing friend from list - main methods:
  const removeFriend = () => {
    // Remove friend with given id:
    const idx = owners.findIndex((e) => e.id === toRemove.id);
    setOwners([...owners.slice(0, idx), ...owners.slice(idx + 1)]);

    // TODO: Send request to API to remove friend globally instead of locally

    // Hide dialog:
    setDialogVisible(false);
  };
  const cancelRemoveFriend = () => {
    // Hide dialog:
    setDialogVisible(false);
  };

  // Navigation:
  const navigateToShare = () => {
    // Prevent loop Share-EditPermissions:
    if (!!route.params && route.params.behavior === 'pop') {
      navigation.pop();
    } else {
      navigation.navigate('Share', {
        behavior: 'pop',
        type: route.params.type,
        containerID: route.params.containerID,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppBar label='edit permissions' />
      <Divider />
      <ScrollView>
        {/* Connection with Share Screen */}
        <TouchableRipple onPress={navigateToShare}>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Add more friends</Text>
            <Image style={styles.icon} source={forward} />
          </View>
        </TouchableRipple>
        <Divider />

        {/* Creator of this fridge / shopping list */}
        <UserInfo
          title={creator.username}
          subtitle='CREATOR'
          avatarURI={creator.avatar}
          variant='small'
        />

        {/* List of people who have access to this fridge / shopping list */}
        {owners.map((user) => (
          <TouchableRipple
            key={user.id}
            onPress={() => prepareToChangePermission(user)}
          >
            <UserInfo
              title={user.username}
              subtitle={user.permission}
              subtitleTint={theme.colors.blueJeans}
              avatarURI={user.avatar}
              variant='small'
              icon1={deleteIcon}
              onPressIcon1={() => prepareToRemove(user)}
              iconTint1={theme.colors.silverMetallic}
            />
          </TouchableRipple>
        ))}
      </ScrollView>

      {/* Permission actions */}
      <BottomSheet reference={refBS} title='Change permission'>
        <SheetRow
          icon={!!toChange && toChange.permission === 'can view' ? check : null}
          text='Can view'
          onPress={() => {
            changePermission('can view');
          }}
        />
        <SheetRow
          icon={!!toChange && toChange.permission === 'can edit' ? check : null}
          text='Can edit'
          onPress={() => {
            changePermission('can edit');
          }}
        />
        <SheetRow
          icon={
            !!toChange && toChange.permission === 'administrator' ? check : null
          }
          text='Administrator'
          onPress={() => {
            changePermission('administrator');
          }}
        />
      </BottomSheet>

      {/* Removing friend from list */}
      {/* TODO: Pass Fridge/List name and display it in the dialog */}
      <Dialog
        title='Remove friend from list'
        paragraph={`Are you sure you want to remove  ${toRemoveNick} from <list name>? This action cannot be undone.`}
        visibilityState={[dialogVisible, setDialogVisible]}
        label1='remove'
        onPressLabel1={removeFriend}
        label2='cancel'
        onPressLabel2={cancelRemoveFriend}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: theme.colors.white,
  },
  icon: {
    height: 32,
    width: 32,
    margin: 4,
    tintColor: theme.colors.silverMetallic,
  },
  imageContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: theme.colors.silverMetallic,
  },
}));

export default EditPermissions;
