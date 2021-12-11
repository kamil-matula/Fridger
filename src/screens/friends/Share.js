/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { UserInfo, AppBar, LoadingOverlay } from 'components';
import { add, forward } from 'assets/icons';

import { useFriendsQuery } from 'services/fridger/friends';

const Share = ({ route, navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const [friends, setFriends] = useState([]);
  const [friendsCount, setFriendsCount] = useState(4);

  const { data: friendsData, isLoading: friendsAreLoading } =
    useFriendsQuery(true);

  // Update list of friends when data is fetched:
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

  const addFriend = () => {
    // TODO: Send request to API to share fridge/shopping list with friend
  };

  const navigateToEditPermissions = () => {
    // Prevent loop Share-EditPermissions:
    if (!!route.params && route.params.behavior === 'pop') {
      navigation.pop();
    } else {
      navigation.navigate('EditPermissions', {
        behavior: 'pop',
        type: route.params.type,
        containerID: route.params.containerID,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Loading */}
      {friendsAreLoading && <LoadingOverlay />}

      <AppBar label='share with friends' />
      <Divider />
      <ScrollView>
        {/* Connection with Edit Permissions Screen */}
        <TouchableRipple onPress={navigateToEditPermissions}>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>
              {`Shared with ${friendsCount} friends`}
            </Text>
            <Image style={styles.icon} source={forward} />
          </View>
        </TouchableRipple>

        {/* List of friends available to invite */}
        <Divider />
        {friends.map((user) => (
          <UserInfo
            key={user.id}
            title={user.username}
            subtitle={
              user.firstName
                ? `${user.firstName} ${user.lastName ? user.lastName : ''}`
                : null
            }
            avatarURI={user.avatar}
            variant='small'
            icon1={add}
            onPressIcon1={() => addFriend(user)}
            iconTint1={theme.colors.silverMetallic}
          />
        ))}
      </ScrollView>
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

export default Share;
