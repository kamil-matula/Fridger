import React from 'react';

import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import { makeStyles } from 'utils';
import { tmpPerson } from 'assets/images';

const Chip = ({ avatarURI, text }) => {
  const styles = useStyles();

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={avatarURI ? { uri: avatarURI } : tmpPerson}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

Chip.propTypes = {
  avatarURI: PropTypes.string,
  text: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.silverMetallic,
    borderWidth: 1,
    borderRadius: 16,
  },
  avatar: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: theme.colors.text,
    marginRight: 12,
  },
}));

export default Chip;
