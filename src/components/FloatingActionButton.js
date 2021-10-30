import React from 'react';

import { FAB, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const FloatingActionButton = ({ onPress }) => {
  const styles = useStyles();
  const colors = useTheme().colors;

  return (
    <FAB
      style={styles.fab}
      icon='plus'
      onPress={onPress}
      color={colors.richBlack}
    />
  );
};

FloatingActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.blueJeans,
  },
}));

export default FloatingActionButton;
