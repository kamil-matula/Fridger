import React from 'react';

import PropTypes from 'prop-types';
import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { UserInfo, AppBar, LoadingOverlay } from 'components';
import { add, forward } from 'assets/icons';

import { useFriendsQuery } from 'services/fridger/friends';
import {
  useFridgeOwnersQuery,
  useAddFridgeUserMutation,
} from 'services/fridger/fridgesOwnerships';
import {
  useShoppingListOwnersQuery,
  useAddShoppingListUserMutation,
} from 'services/fridger/shoppingListsOwnerships';

export const ShareFridge = ({ route, navigation }) => {
  const addUser = useAddFridgeUserMutation()[0];
  const owners = useFridgeOwnersQuery(route.params.containerID);
  const friends = useFriendsQuery({
    isAccepted: true,
    fridgeId: route.params.containerID,
  });

  return (
    <Share
      route={route}
      navigation={navigation}
      addUser={addUser}
      owners={owners}
      friends={friends}
    />
  );
};

export const ShareShoppingList = ({ route, navigation }) => {
  const addUser = useAddShoppingListUserMutation()[0];
  const owners = useShoppingListOwnersQuery(route.params.containerID);
  const friends = useFriendsQuery({
    isAccepted: true,
    shoppingListId: route.params.containerID,
  });

  return (
    <Share
      route={route}
      navigation={navigation}
      addUser={addUser}
      owners={owners}
      friends={friends}
    />
  );
};

const Share = ({ addUser, owners, friends, route, navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const addFriend = (id) => {
    // Send request to API to share fridge/shopping list with friend
    addUser({
      userId: id,
      containerId: route.params.containerID,
      permissionName: 'READ',
    })
      .unwrap()
      .catch((error) => {
        // Display error connected with input field...
        if (error.data?.name) displayToast('Invalid name');
        // ... or other error:
        else
          displayToast(error.data?.non_field_errors || 'Something went wrong');
      });
  };

  const navigateToEditPermissions = () => {
    // Prevent loop Share-EditPermissions:
    if (!!route.params && route.params.behavior === 'pop') {
      navigation.pop();
    } else if (route.params.type === 'fridge') {
      navigation.navigate('EditPermissionsFridge', {
        behavior: 'pop',
        type: route.params.type,
        containerID: route.params.containerID,
        containerName: route.params.containerName,
      });
    } else {
      navigation.navigate('EditPermissionsShoppingList', {
        behavior: 'pop',
        type: route.params.type,
        containerID: route.params.containerID,
        containerName: route.params.containerName,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Loading */}

      <AppBar label='share with friends' />
      <Divider />
      {friends.isLoading || owners.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          {/* Connection with Edit Permissions Screen */}
          <TouchableRipple onPress={navigateToEditPermissions}>
            <View style={styles.infoContainer}>
              <Text style={styles.text}>
                {`Shared with ${owners.data.length - 1} friends`}
              </Text>
              <Image style={styles.icon} source={forward} />
            </View>
          </TouchableRipple>

          {/* List of friends available to invite */}
          <Divider />
          {friends.data?.map(({ friend }) => (
            <UserInfo
              key={friend.id}
              title={friend.username}
              subtitle={`${friend.first_name} ${friend.last_name}`.trim()}
              avatarURI={friend.avatar}
              variant='small'
              icon1={add}
              onPressIcon1={() => addFriend(friend.id)}
              iconTint1={theme.colors.silverMetallic}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

Share.propTypes = {
  addUser: PropTypes.func,
  owners: PropTypes.object,
  friends: PropTypes.object,
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
