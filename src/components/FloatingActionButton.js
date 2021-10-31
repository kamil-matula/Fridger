import React from 'react';

import { FAB, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const FloatingActionButton = ({ onPress, label, centered = false }) => {
  const styles = useStyles({ centered });
  const { colors } = useTheme();

  return (
    <FAB
      style={styles.fab}
      icon='plus'
      onPress={onPress}
      color={colors.richBlack}
      label={label}
    />
  );
};

FloatingActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  centered: PropTypes.bool,
};

const useStyles = makeStyles((theme, { centered }) => {
  const obj = {
    fab: {
      position: 'absolute',
      margin: 16,
      bottom: 0,
      backgroundColor: theme.colors.blueJeans,
    },
  };

  if (centered) obj.fab.alignSelf = 'center';
  else obj.fab.right = 0;

  return obj;
});

export default FloatingActionButton;