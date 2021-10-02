import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Menu = () => {
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
      <Text style={{ color: colors.text}}>Menu</Text>
    </View>
  );
};

export default Menu;
