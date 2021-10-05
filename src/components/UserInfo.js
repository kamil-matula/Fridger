import React from 'react';

import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import { makeStyles } from '../utils';

const UserInfo = ({ text, subtext, avatarURI }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Avatar.Image source={avatarURI} size={64} />
      <View style={styles.nameAndNickColumn}>
        <Text style={styles.name}>{text}</Text>
        <Text style={styles.nick}>{subtext}</Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    margin: 16,
  },
  nameAndNickColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    color: theme.colors.text,
  },
  nick: {
    fontSize: 18,
    color: theme.colors.silverMetallic,
  },
}));

export default UserInfo;
