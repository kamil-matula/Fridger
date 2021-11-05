import React from 'react';

import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { forward } from 'assets/icons';
import { makeStyles } from 'utils';

const DrawerRow = ({ onPress, label }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{label}</Text>
        <Image source={forward} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

DrawerRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '500',
  },
  icon: {
    tintColor: theme.colors.silverMetallic,
    width: 32,
    height: 32,
  },
}));

export default DrawerRow;
