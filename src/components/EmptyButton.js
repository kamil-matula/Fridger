import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmptyButton = ({ label }) => {
  const colors = useTheme().colors;

  return (
    <TouchableOpacity style={[styles.buttonStyle, { borderColor: colors.blueJeans }]}>
      <Text style={[styles.textStyle, { color: colors.blueJeans }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginVertical: 14,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default EmptyButton;
