import React from 'react';

import { FAB, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import { add, check } from 'assets/icons';

const FloatingActionButton = ({
  onPress,
  label,
  centered = false,
  confirm = false,
}) => {
  const styles = useStyles({ centered });
  const { colors } = useTheme();

  return (
    <FAB
      style={styles.fab}
      icon={confirm ? check : add}
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
  confirm: PropTypes.bool,
};

const useStyles = makeStyles((theme, { centered }) => {
  // Default styles:
  const obj = {
    fab: {
      position: 'absolute',
      margin: 16,
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.blueJeans,
    },
  };

  // Rendering in the middle:
  if (centered) {
    obj.fab.right = null;
    obj.fab.alignSelf = 'center';
    obj.fab.height = 48;
  }

  return obj;
});

export default FloatingActionButton;
