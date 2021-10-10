import React from 'react';

import { TouchableOpacity, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import backIcon from '../../assets/images/back.png';
import { makeStyles } from '../utils';

const AppBar = ({ onPress, label }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Image source={backIcon} style={styles.icon} />
        <Text style={styles.title}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

AppBar.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 32,
    color: theme.colors.text,
  },
  icon: {
    width: 30,
  },
}));

export default AppBar;
