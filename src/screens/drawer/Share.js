/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';

import { makeStyles } from 'utils';
import { UserInfo, AppBar } from 'components';
import { add } from 'assets/icons';
import { friendsList } from './tmpData';

const Share = () => {
  const styles = useStyles();
  const theme = useTheme();

  const [friends, setFriends] = useState(friendsList);

  const addFriend = (friend) => {
    // TODO: Send request to API to share fridge/shopping list with friend
  };

  return (
    <View style={styles.container}>
      <AppBar label='share with friends' />
      <Divider style={styles.divider} />
      <ScrollView>
        {friends.map((e) => (
          <UserInfo
            key={e.id}
            title={e.nick}
            subtitle={`${e.name} ${e.surname}`}
            avatarURI={e.avatar}
            variant='small'
            icon1={add}
            onPressIcon1={() => addFriend(e)}
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
    color: theme.colors.text,
  },
  icon: {
    height: 32,
    width: 32,
    margin: 4,
    tintColor: theme.colors.silverMetallic,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
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
