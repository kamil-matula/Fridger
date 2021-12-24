import React from 'react';

import PropTypes from 'prop-types';
import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { UserInfo, AppBar, ActivityIndicator } from 'components';
import { add, forward } from 'assets/icons';

import { useFriendsQuery } from 'services/fridger/friends';
import {
  useFridgeOwnershipsQuery,
  useAddFridgeUserMutation,
} from 'services/fridger/fridgesOwnerships';
import {
  useShoppingListOwnershipsQuery,
  useAddShoppingListUserMutation,
} from 'services/fridger/shoppingListsOwnerships';

export const ShareFridge = ({ route, navigation }) => {
  const addFridgeUser = useAddFridgeUserMutation()[0];
  const ownerships = useFridgeOwnershipsQuery(route.params.containerID);
  const friends = useFriendsQuery({
    isAccepted: true,
    fridgeId: route.params.containerID,
  });

  return (
    <Share
      route={route}
      navigation={navigation}
      addUser={addFridgeUser}
      ownerships={ownerships}
      friends={friends}
      containerType='fridge'
    />
  );
};

export const ShareShoppingList = ({ route, navigation }) => {
  const addShoppingListUser = useAddShoppingListUserMutation()[0];
  const ownerships = useShoppingListOwnershipsQuery(route.params.containerID);
  const friends = useFriendsQuery({
    isAccepted: true,
    shoppingListId: route.params.containerID,
  });

  return (
    <Share
      route={route}
      navigation={navigation}
      addUser={addShoppingListUser}
      ownerships={ownerships}
      friends={friends}
      containerType='shoppingList'
    />
  );
};

const Share = ({
  addUser,
  ownerships,
  friends,
  route,
  navigation,
  containerType,
}) => {
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
      .catch(() => displayToast('Unable to share with friend'));
  };

  const navigateToEditPermissions = () => {
    // Prevent loop Share-EditPermissions:
    if (!!route.params && route.params.behavior === 'pop') {
      navigation.pop();
    } else {
      navigation.navigate(
        containerType === 'fridge'
          ? 'EditPermissionsFridge'
          : 'EditPermissionsShoppingList',
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
      {/* Loading */}

      <AppBar label='Share with friends' />
      <Divider />
      {friends.isLoading || ownerships.isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {/* Connection with Edit Permissions Screen */}
          <TouchableRipple onPress={navigateToEditPermissions}>
            <View style={styles.infoContainer}>
              <Text style={styles.text}>
                {`Shared with ${ownerships.data.length - 1} friends`}
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
  addUser: PropTypes.func.isRequired,
  ownerships: PropTypes.object.isRequired,
  friends: PropTypes.object.isRequired,
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
