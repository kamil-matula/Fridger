/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import {
  View,
  Image,
  ScrollView,
  Text,
  AlertIOS,
  Platform,
} from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { UserInfo, AppBar, LoadingOverlay } from 'components';
import { add, forward } from 'assets/icons';

import { useFriendsQuery } from 'services/fridger/friends';
import {
  useFridgeOwnersQuery,
  useAddFridgeUserMutation,
} from 'services/fridger/fridgesOwnerships';

const Share = ({ route, navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const owners = useFridgeOwnersQuery(route.params.containerID);
  const friends = useFriendsQuery(true);
  const addUser = useAddFridgeUserMutation()[0];

  const addFriend = (id) => {
    // Send request to API to share fridge/shopping list with friend
    addUser({
      userId: id,
      fridgeId: route.params.containerID,
      permissionName: 'READ',
    })
      .unwrap()
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
          {friends.data.map(({ friend }) => (
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
