import React from 'react';

import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { makeStyles } from '../utils';

const EmptyButton = ({ label }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.blueJeans,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  textStyle: {
    color: theme.colors.blueJeans,
    marginVertical: 14,
    fontSize: 14,
    fontWeight: '500',
  },
}));

export default EmptyButton;
