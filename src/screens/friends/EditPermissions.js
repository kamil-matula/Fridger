import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';
import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, useTheme, TouchableRipple } from 'react-native-paper';

import { makeStyles, displayToast } from 'utils';
import { UserInfo, AppBar, Dialog, ActivityIndicator } from 'components';
import { forward, deleteIcon } from 'assets/icons';

import {
  useFridgeOwnershipsQuery,
  useRemoveFridgeUserMutation,
  useUpdateFridgePermissionMutation,
} from 'services/fridger/fridgesOwnerships';
import {
  useShoppingListOwnershipsQuery,
  useUpdateShoppingListPermissionMutation,
  useRemoveShoppingListUserMutation,
} from 'services/fridger/shoppingListsOwnerships';
import { Permissions } from 'bottomSheets';

export const EditPermissionsFridge = ({ route, navigation }) => {
  const updatePermission = useUpdateFridgePermissionMutation()[0];
  const removeUser = useRemoveFridgeUserMutation()[0];
  const ownerships = useFridgeOwnershipsQuery(route.params.containerID);

  return (
    <EditPermissions
      updatePermission={updatePermission}
      removeUser={removeUser}
      ownerships={ownerships}
      route={route}
      navigation={navigation}
      containerType='fridge'
    />
  );
};

export const EditPermissionsShoppingList = ({ route, navigation }) => {
  const updatePermission = useUpdateShoppingListPermissionMutation()[0];
  const removeUser = useRemoveShoppingListUserMutation()[0];
  const ownerships = useShoppingListOwnershipsQuery(route.params.containerID);

  return (
    <EditPermissions
      updatePermission={updatePermission}
      removeUser={removeUser}
      ownerships={ownerships}
      route={route}
      navigation={navigation}
      containerType='shoppingList'
    />
  );
};

const EditPermissions = ({
  updatePermission,
  removeUser,
  ownerships,
  route,
  navigation,
  containerType,
}) => {
  const styles = useStyles();
  const theme = useTheme();

  // Update creator when data is fetched:
  const [creator, setCreator] = useState(null);
  useEffect(() => {
    if (ownerships.data) {
      const tmp = ownerships.data.find((e) => e.permission === 'CREATOR');
      if (tmp)
        setCreator({
          username: tmp.user.username,
          avatar: tmp.user.avatar,
          permission: tmp.permission,
        });
    }
  }, [ownerships.data]);

  // Changing permissions:
  const refBS = useRef(null);
  const [toChange, setToChange] = useState(null);
  const prepareToChangePermission = (friend) => {
    setToChange(friend);
    refBS.current.open();
  };

  // Removing friend from list - preparation:
  const [dialogVisible, setDialogVisible] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const prepareToRemove = (friend) => {
    // Display dialog with appropriate data:
    setToRemove(friend);
    setDialogVisible(true);
  };

  // Removing friend from list - main methods:
  const removeFriend = () => {
    removeUser(toRemove.id)
      .unwrap()
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to remove friend')
      );

    // Hide dialog:
    setDialogVisible(false);
  };
  const cancelRemoveFriend = () => setDialogVisible(false);

  // Navigation:
  const navigateToShare = () => {
    // Prevent loop Share-EditPermissions:
    if (!!route.params && route.params.behavior === 'pop') {
      navigation.pop();
    } else {
      navigation.navigate(
        containerType === 'fridge' ? 'ShareFridge' : 'ShareShoppingList',
        {
          behavior: 'pop',
          containerID: route.params.containerID,
          containerName: route.params.containerName,
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <AppBar label='Edit permissions' />
      <Divider />

      {ownerships.isLoading ? (
        <ActivityIndicator />
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
          {creator && (
            <UserInfo
              title={creator.username}
              subtitle={creator.permission}
              avatarURI={creator.avatar}
              variant='small'
            />
          )}

          {/* List of people who have access to this fridge / shopping list */}
          {ownerships.data
            .filter((ownership) => ownership.permission !== 'CREATOR')
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
      <Permissions
        reference={refBS}
        selectedOwnership={toChange}
        updatePermission={updatePermission}
      />

      {/* Removing friend from fridge / shopping list */}
      <Dialog
        title='Remove friend'
        paragraph={`Are you sure you want to remove ${toRemove?.user.username} from ${route.params.containerName}? This action cannot be undone.`}
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
  updatePermission: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  ownerships: PropTypes.object.isRequired,
  containerType: PropTypes.string.isRequired,
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
