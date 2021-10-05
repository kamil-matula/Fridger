import React from 'react';

import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import forwardIcon from '../../assets/images/forward.png';
import { makeStyles } from '../utils';

const DrawerRow = ({ onPress, label }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rowStyle}>
        <Text style={styles.titleStyle}>{label}</Text>
        <Image source={forwardIcon} style={styles.iconStyle} />
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default DrawerRow;
