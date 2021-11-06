/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import { UserInfo, AppBar } from 'components';
import { add, forward } from 'assets/icons';
import { friendsList } from './tmpData';

const Share = ({ route, navigation }) => {
  const styles = useStyles();
  const theme = useTheme();

  const [friends, setFriends] = useState(friendsList);
  const [friendsCount, setFriendsCount] = useState(4);

  const addFriend = () => {
    // TODO: Send request to API to share fridge/shopping list with friend
  };

  const navigateToShare = () => {
    // prevent loop Share-EditPermission
    if (!!route.params && route.params.behavior === 'pop') {
      navigation.pop();
    } else {
      navigation.push('DrawerNavigator', {
        screen: 'EditPermission',
        params: { behavior: 'pop' },
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppBar label='share with friends' />
      <Divider style={styles.divider} />
      <ScrollView>
        <TouchableRipple onPress={navigateToShare}>
          <View style={styles.infoContainer}>
            <Text style={styles.text}>
              {`Shared with ${friendsCount} friends`}
            </Text>
            <Image style={styles.icon} source={forward} />
          </View>
        </TouchableRipple>
        <Divider style={styles.divider} />
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

Share.propTypes = {
  route: PropTypes.object,
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
