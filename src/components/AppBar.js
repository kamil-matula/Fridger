import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import backIcon from '../../assets/images/back.png';

const AppBar = ({ onPress, label }) => {
  const colors = useTheme().colors;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rowStyle}>
        <Image source={backIcon} style={styles.iconStyle} />
        <Text style={[styles.textStyle, { color: colors.text }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 32,
  },
  iconStyle: {
    width: 30,
  },
});

export default AppBar;
