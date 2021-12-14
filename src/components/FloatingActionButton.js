import React, { useState } from 'react';

import { View, ActivityIndicator } from 'react-native';
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
  isLoading = false,
}) => {
  const [fabPosition, setFabPosition] = useState(null);
  const styles = useStyles({ centered, fabPosition, isBottomNavigationBar });
  const { colors } = useTheme();

  return (
    <View
      style={styles.fabContainer}
      onLayout={(e) => {
        // Measure only after first build:
        if (!fabPosition) setFabPosition(e.nativeEvent.layout.y);
      }}
    >
      {!isLoading ? (
        <FAB
          visible={visible}
          style={styles.fab}
          icon={confirm ? check : add}
          onPress={onPress}
          color={colors.richBlack}
          label={label}
        />
      ) : (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size='large' color={colors.blueJeans} />
        </View>
      )}
    </View>
  );
};

FloatingActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
  centered: PropTypes.bool,
  visible: PropTypes.bool,
  confirm: PropTypes.bool,
  isBottomNavigationBar: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const useStyles = makeStyles(
  (theme, { centered, fabPosition, isBottomNavigationBar }) => {
    // Default styles:
    const obj = {
      fab: {
        backgroundColor: theme.colors.blueJeans,
      },
      fabContainer: {
        position: 'absolute',
        borderRadius: 32,
        margin: 16,
        right: 0,
      },
      indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
      },
    };

    // Rendering at the bottom:
    if (fabPosition) {
      obj.fabContainer.top = fabPosition - 16;
    } else {
      obj.fabContainer.bottom = isBottomNavigationBar ? 54 : 0;
    }

    // Rendering in the middle:
    if (centered) {
      obj.fabContainer.right = null;
      obj.fabContainer.alignSelf = 'center';
      obj.fabContainer.height = 48;
    }

    return obj;
  }
);

export default FloatingActionButton;
