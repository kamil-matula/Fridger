import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import forwardIcon from '../../assets/images/forward.png';

const DrawerRow = ({ onPress, label }) => {
  const colors = useTheme().colors;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Text style={[styles.title, { color: colors.text }]}>{label}</Text>
        <Image source={forwardIcon} style={[styles.icon, { tintColor: colors.silverMetallic }]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 13.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default DrawerRow;
