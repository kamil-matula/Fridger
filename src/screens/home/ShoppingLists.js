import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const ShoppingLists = () => {
  const theme = useTheme();

  return (
    <View style={styles(theme).contentStyle}>
      <Text style={styles(theme).textStyle}>Shopping Lists</Text>
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    contentStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    textStyle: {
      color: theme.colors.text,
    },
  });

export default ShoppingLists;
