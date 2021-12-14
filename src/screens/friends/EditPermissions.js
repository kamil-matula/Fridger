import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
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
  useFridgeOwnersQuery,
  useRemoveFridgeUserMutation,
  useUpdateFridgePermissionMutation,
} from 'services/fridger/fridgesOwnerships';
import {
  useShoppingListOwnersQuery,
  useUpdateShoppingListPermissionMutation,
  useRemoveShoppingListUserMutation,
} from 'services/fridger/shoppingListsOwnerships';

export const EditPermissionsFridge = ({ route, navigation }) => {
  const updatePermission = useUpdateFridgePermissionMutation()[0];
  const removeUser = useRemoveFridgeUserMutation()[0];
  const owners = useFridgeOwnersQuery(route.params.containerID);

  return (
    <EditPermissions
      updatePermission={updatePermission}
      removeUser={removeUser}
      owners={owners}
      route={route}
      navigation={navigation}
    />
  );
};

export const EditPermissionsShoppingList = ({ route, navigation }) => {
  const updatePermission = useUpdateShoppingListPermissionMutation()[0];
  const removeUser = useRemoveShoppingListUserMutation()[0];
  const owners = useShoppingListOwnersQuery(route.params.containerID);

  return (
    <EditPermissions
      updatePermission={updatePermission}
      removeUser={removeUser}
      owners={owners}
      route={route}
      navigation={navigation}
    />
  );
};

const EditPermissions = ({
  updatePermission,
  removeUser,
  owners,
  route,
  navigation,
}) => {
  const styles = useStyles();
  const theme = useTheme();

  const [creator, setCreator] = useState({
    username: '',
    avatar: null,
    permission: '',
  });

  // Update list of owners when data is fetched:
  useEffect(() => {
    if (owners.data) {
      const tmp = owners.data.find((e) => e.permission === 'CREATOR');
      setCreator({
        username: tmp.user.username,
        avatar: tmp.user.avatar,
        permission: tmp.permission,
      });
    }
  }, [owners.data]);

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
      modelId: toChange.id,
      permissionName: newPermission,
    })
      .unwrap()
      .catch((error) => {
        displayToast(error.data?.non_field_errors || 'Something went wrong');
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
    setToRemoveNick(friend.user.username);
    setDialogVisible(true);
  };

  // Removing friend from list - main methods:
  const removeFriend = () => {
    removeUser(toRemove.id)
      .unwrap()
      .catch((error) => {
        displayToast(error.data?.non_field_errors || 'Something went wrong');
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
      navigation.navigate('ShareShoppingList', {
        behavior: 'pop',
        containerID: route.params.containerID,
        containerName: route.params.containerName,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppBar label='edit permissions' />
      <Divider />
      {owners.isLoading ? (
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
          {owners.data
            .filter((user) => user.permission !== 'CREATOR')
            .map((ownership) => (
              <TouchableRipple
                key={ownership.id}
                onPress={() => prepareToChangePermission(ownership)}
              >
                <UserInfo
                  title={ownership.user.username}
                  subtitle={ownership.permission}
                  subtitleTint={theme.colors.blueJeans}
                  avatarURI={ownership.user.avatar}
                  variant='small'
                  icon1={deleteIcon}
                  onPressIcon1={() => prepareToRemove(ownership)}
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
        paragraph={`Are you sure you want to remove ${toRemoveNick} from ${route.params.containerName}? This action cannot be undone.`}
        visibilityState={[dialogVisible, setDialogVisible]}
        label1='remove'
        onPressLabel1={removeFriend}
        label2='cancel'
        onPressLabel2={cancelRemoveFriend}
      />
    </View>
  );
};

EditPermissions.propTypes = {
  updatePermission: PropTypes.func,
  removeUser: PropTypes.func,
  owners: PropTypes.object,
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
