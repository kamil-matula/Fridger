import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import backIcon from '../../assets/images/back.png';

const AppBar = ({ onPress, label }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles(theme).rowStyle}>
        <Image source={backIcon} style={styles(theme).iconStyle} />
        <Text style={styles(theme).textStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme) =>
  StyleSheet.create({
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
      color: theme.colors.text,
    },
    iconStyle: {
      width: 30,
    },
  });

export default AppBar;
