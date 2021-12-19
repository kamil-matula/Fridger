import React from 'react';

import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const Placeholder = ({ content }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

Placeholder.propTypes = {
  content: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: theme.colors.whiteSemiTransparent,
    textAlign: 'center',
    marginHorizontal: 32,
  },
}));

export default Placeholder;
