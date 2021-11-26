import React from 'react';

import { View } from 'react-native';
import { Portal, ActivityIndicator, useTheme } from 'react-native-paper';

const LoadingOverlay = () => {
  const { colors } = useTheme();

  return (
    <Portal>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.blackSemiTransparent,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={colors.accent} animating size='large' />
      </View>
    </Portal>
  );
};

export default LoadingOverlay;
