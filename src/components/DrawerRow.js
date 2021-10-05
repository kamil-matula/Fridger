import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import forwardIcon from '../../assets/images/forward.png';

const DrawerRow = ({ onPress, label }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles(theme).rowStyle}>
        <Text style={styles(theme).titleStyle}>{label}</Text>
        <Image source={forwardIcon} style={styles(theme).iconStyle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    rowStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 16,
      marginRight: 12,
      marginTop: 8,
      marginBottom: 8,
    },
    titleStyle: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: '500',
    },
    iconStyle: {
      tintColor: theme.colors.silverMetallic,
      width: 32,
      height: 32,
    },
  });

export default DrawerRow;
