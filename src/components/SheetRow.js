import React from 'react';

import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';

const SheetRow = ({ icon, text, onPress }) => {
  const styles = useStyles();

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableRipple>
  );
};

SheetRow.propTypes = {
  icon: PropTypes.number,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: theme.colors.silverMetallic,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    paddingLeft: 32,
  },
}));

export default SheetRow;
