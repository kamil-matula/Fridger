import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const ShoppingLists = () => {
  const colors = useTheme().colors;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ color: colors.text}}>Shopping Lists</Text>
    </View>
  );
};

export default ShoppingLists;
