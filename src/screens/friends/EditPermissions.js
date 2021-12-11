/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, AlertIOS, Platform } from 'react';

import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, useTheme, TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';
import {
  UserInfo,
  AppBar,
  BottomSheet,
  SheetRow,
  Dialog,
  LoadingOverlay,
} from 'components';
import { forward, deleteIcon, check } from 'assets/icons';

import {
  useLazyFridgeOwnersQuery,
  useRemoveUserMutation,
  useUpdatePermissionMutation,
} from 'services/fridger/fridgesOwnerships';

const EditPermissions = ({ route, navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const [creator, setCreator] = useState({
    username: '',
    avatar: null,
    permission: '',
  });
  const [owners, setOwners] = useState([]);

  const updatePermission = useUpdatePermissionMutation()[0];
  const [removeUser, removeUserStatus] = useRemoveUserMutation();
  const [ownersQuery, ownersQueryStatus] = useLazyFridgeOwnersQuery();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ownersQuery(route.params.containerID);
    });

    return unsubscribe;
  }, [navigation]);

  // Update list of owners when data is fetched:
  useEffect(() => {
    if (ownersQueryStatus.data) {
      setOwners(
        ownersQueryStatus.data
          .filter((e) => {
            if (e.permission === 'CREATOR') {
              setCreator({
                username: e.user.username,
                avatar: e.user.avatar,
                permission: e.permission,
              });
              return false;
            }
            return true;
          })
          .map((e) => ({
            modelId: e.id,
            id: e.user.id,
            username: e.user.username,
            firstName: e.user.first_name,
            lastName: e.user.last_name,
            avatar: e.user.avatar,
            permission: e.permission,
          }))
      );
    }
  }, [ownersQueryStatus.data]);

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
    updatePermission({
      modelId: toChange.modelId,
      userId: toChange.id,
      fridgeId: route.params.containerID,
      permissionName: newPermission,
    })
      .unwrap()
      .then(() => {
        // Change permissions for a friend with given id:
        const idx = owners.findIndex((e) => e.id === toChange.id);
        const changedFriend = owners[idx];
        changedFriend.permission = newPermission;
        setOwners([
          ...owners.slice(0, idx),
          changedFriend,
          ...owners.slice(idx + 1),
        ]);
      })
      .catch((error) => {
        const generalError = error.data?.non_field_errors;
        if (generalError) {
          const message = generalError.join(' ');
          if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            AlertIOS.alert(message);
          }
        }
      });

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
    setToRemoveNick(friend.username);
    setDialogVisible(true);
  };

  // Removing friend from list - main methods:
  const removeFriend = () => {
    removeUser(toRemove.modelId)
      .unwrap()
      .then(() => {
        // Remove friend with given id:
        const idx = owners.findIndex((e) => e.id === toRemove.id);
        setOwners([...owners.slice(0, idx), ...owners.slice(idx + 1)]);
      })
      .catch((error) => {
        const generalError = error.data?.non_field_errors;
        if (generalError) {
          const message = generalError.join(' ');
          if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            AlertIOS.alert(message);
          }
        }
      });

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
      {ownersQueryStatus.isLoading || removeUserStatus.isLoading ? (
        <LoadingOverlay />
      ) : (
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
            subtitle={creator.permission}
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
      )}

      {/* Permission actions */}
      <BottomSheet reference={refBS} title='Change permission'>
        <SheetRow
          icon={!!toChange && toChange.permission === 'can view' ? check : null}
          text='Can view'
          onPress={() => {
            changePermission('READ');
          }}
        />
        <SheetRow
          icon={!!toChange && toChange.permission === 'can edit' ? check : null}
          text='Can edit'
          onPress={() => {
            changePermission('WRITE');
          }}
        />
        <SheetRow
          icon={
            !!toChange && toChange.permission === 'administrator' ? check : null
          }
          text='Administrator'
          onPress={() => {
            changePermission('ADMIN');
          }}
        />
      </BottomSheet>

      {/* Removing friend from list */}
      {/* TODO: Pass Fridge/List name and display it in the dialog */}
      <Dialog
        title='Remove friend from list'
        paragraph={`Are you sure you want to remove ${toRemoveNick} from list? This action cannot be undone.`}
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
