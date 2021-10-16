import React from 'react';

import { View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';

const UserInfo = ({ text, subtext, avatarURI }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Avatar.Image source={{uri: avatarURI}} size={64} />
      <View style={styles.column}>
        <Text style={styles.title}>{text}</Text>
        <Text style={styles.subtitle}>{subtext}</Text>
      </View>
    </View>
  );
};

UserInfo.propTypes = {
  text: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  avatarURI: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    margin: 16,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.silverMetallic,
  },
}));

export default UserInfo;
