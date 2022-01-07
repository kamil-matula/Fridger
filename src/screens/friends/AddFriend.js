import React, { useEffect, useState } from 'react';

import { View, TextInput, Image } from 'react-native';
import { Divider, useTheme, ActivityIndicator } from 'react-native-paper';

import {
  AppBar,
  UserDataRow,
  Button,
  ScrollViewLayout,
  Separator,
} from 'components';
import { displayToast, makeStyles } from 'utils';
import { tmpPerson } from 'assets/images';

import { useLazyFindUserQuery } from 'services/fridger/user';
import { useAddToFriendsMutation } from 'services/fridger/friends';

const AddFriend = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  // Queries:
  const [findUserQuery, findUser] = useLazyFindUserQuery();
  const [addToFriendsQuery, addToFriends] = useAddToFriendsMutation();

  const [username, setUsername] = useState('');
  const [friend, setFriend] = useState(null);

  const find = () => findUserQuery(username);

  // Update states when data is fetched or display error message:
  useEffect(() => {
    if (findUser.isSuccess) {
      setFriend({
        id: findUser.data.id,
        username: findUser.data.username,
        firstName: findUser.data.first_name,
        lastName: findUser.data.last_name,
        avatar: findUser.data.avatar,
      });
    }
    if (findUser.isError) {
      displayToast('User not found');
    }
  }, [findUser.data]);

  // Handle with adding friend action:
  useEffect(() => {
    if (addToFriends.isSuccess) {
      displayToast('Invitation has been sent');
      navigation.goBack();
    }
    if (addToFriends.isError) {
      displayToast('Unable to add friend');
    }
  }, [addToFriends.isSuccess, addToFriends.isError]);

  return (
    <View style={styles.container}>
      <AppBar label='Add friend' />
      <Divider />

      {/* Searching by username */}
      <TextInput
        style={styles.input}
        placeholder='Enter username'
        placeholderTextColor={colors.silverMetallic}
        value={username}
        onChangeText={setUsername}
        onEndEditing={find}
        maxLength={20}
      />
      <Divider />

      {/* User profile / loader */}
      {findUser.isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator animating size='large' color={colors.blueJeans} />
        </View>
      ) : (
        findUser.isSuccess && (
          <>
            <ScrollViewLayout>
              <View>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.avatar}
                    source={
                      friend?.avatar !== null
                        ? { uri: friend?.avatar }
                        : tmpPerson
                    }
                  />
                </View>
                <UserDataRow label='Nick' data={friend?.username} />
                <Separator />
                <UserDataRow label='Name' data={friend?.firstName} />
                <Separator />
                <UserDataRow label='Surname' data={friend?.lastName} />
                <Separator height={32} />
              </View>
              <View>
                <Button
                  label='add to friends'
                  variant='contained'
                  onPress={() => addToFriendsQuery(friend.id)}
                  isLoading={addToFriends.isLoading}
                />
                <Separator />
              </View>
            </ScrollViewLayout>
          </>
        )
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  input: {
    padding: 16,
    color: theme.colors.white,
    fontSize: 20,
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

export default AddFriend;
