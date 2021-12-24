import React from 'react';

import { View } from 'react-native';
import {
  ActivityIndicator as PaperActivityIndicator,
  useTheme,
} from 'react-native-paper';

const ActivityIndicator = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <PaperActivityIndicator color={colors.accent} size='large' />
    </View>
  );
};

export default ActivityIndicator;
