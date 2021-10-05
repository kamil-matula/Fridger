import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmptyButton = ({ label }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles(theme).buttonStyle}>
      <Text style={styles(theme).textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    buttonStyle: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.blueJeans,
      marginHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
    },
    textStyle: {
      color: theme.colors.blueJeans,
      marginVertical: 14,
      fontSize: 14,
      fontWeight: '500',
    },
  });

export default EmptyButton;
