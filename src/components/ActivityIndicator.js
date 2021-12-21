import React from 'react';

import { View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const CustomActivityIndicator = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator color={colors.accent} size='large' />
    </View>
  );
};

export default CustomActivityIndicator;
