import React from 'react';

import { TouchableOpacity, View, Text, Image } from 'react-native';

import backIcon from '../../assets/images/back.png';
import { makeStyles } from '../utils';

const AppBar = ({ onPress, label }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rowStyle}>
        <Image source={backIcon} style={styles.iconStyle} />
        <Text style={styles.textStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default AppBar;
