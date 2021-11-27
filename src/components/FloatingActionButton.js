import React from 'react';

import { Dimensions, StatusBar } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import { add, check } from 'assets/icons';

const FloatingActionButton = ({
  onPress,
  label,
  centered = false,
  visible = true,
  confirm = false,
  isBottomNavigationBar = false,
}) => {
  const windowHeight =
    Dimensions.get('window').height -
    StatusBar.currentHeight -
    (isBottomNavigationBar ? 48 : 0);
  const styles = useStyles({ centered, windowHeight });
  const { colors } = useTheme();

  return (
    <FAB
      visible={visible}
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
  visible: PropTypes.bool,
  confirm: PropTypes.bool,
  isBottomNavigationBar: PropTypes.bool,
};

const useStyles = makeStyles((theme, { centered, windowHeight }) => {
  // Default styles:
  const obj = {
    fab: {
      position: 'absolute',
      margin: 16,
      top: windowHeight - 48 - 16,
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
