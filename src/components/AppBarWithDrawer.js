import React from 'react';

import { TouchableOpacity, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';

import drawerIcon from '../../assets/images/navigation/drawer.png';
import { makeStyles } from '../utils';

const AppBarWithDrawer = ({ onPress, label }) => {
  const styles = useStyles();

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <Image source={drawerIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{label != null ? label : ''}</Text>
      <View style={styles.icon}></View>
    </View>
  );
};

AppBarWithDrawer.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.text,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: theme.colors.silverMetallic,
  },
  iconContainer: {
      marginLeft: 16,
      marginRight: 32,
  },
}));

export default AppBarWithDrawer;
