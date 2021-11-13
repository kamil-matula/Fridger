import React from 'react';

import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { makeStyles } from 'utils';

const SheetRow = ({ icon, text, subText, onPress }) => {
  const styles = useStyles();

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.text}>{text}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}
      </View>
    </TouchableRipple>
  );
};

SheetRow.propTypes = {
  icon: PropTypes.number,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
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
    color: theme.colors.white,
    paddingLeft: 32,
  },
  subText: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
  },
}));

export default SheetRow;
