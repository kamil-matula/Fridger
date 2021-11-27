import React, { useState } from 'react';

import { View } from 'react-native';
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
}) => {
  const [fabPosition, setFabPosition] = useState(null);
  const styles = useStyles({ centered, fabPosition });
  const { colors } = useTheme();

  return (
    <View
      style={styles.fabContainer}
      onLayout={(e) => {
        // Check where is FAB right after first build:
        if (!fabPosition) setFabPosition(e.nativeEvent.layout.y);
      }}
    >
      <FAB
        visible={visible}
        style={styles.fab}
        icon={confirm ? check : add}
        onPress={onPress}
        color={colors.richBlack}
        label={label}
      />
    </View>
  );
};

FloatingActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  centered: PropTypes.bool,
  visible: PropTypes.bool,
  confirm: PropTypes.bool,
};

const useStyles = makeStyles((theme, { centered, fabPosition }) => {
  // Default styles:
  const obj = {
    fab: {
      backgroundColor: theme.colors.blueJeans,
    },
    fabContainer: {
      position: 'absolute',
      borderRadius: 32,
      margin: 16,
      top: fabPosition ? fabPosition - 16 : null,
      bottom: fabPosition ? null : 0,
      right: 0,
    },
  };

  // Rendering in the middle:
  if (centered) {
    obj.fabContainer.right = null;
    obj.fabContainer.alignSelf = 'center';
    obj.fabContainer.height = 48;
  }

  return obj;
});

export default FloatingActionButton;
