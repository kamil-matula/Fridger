import React from 'react';

import { View, Image } from 'react-native';
import { Text, Divider, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import { check } from 'assets/icons';

const FridgeRow = ({ onPress, text, subText, isActive = false }) => {
  const styles = useStyles();

  return (
    <View>
      <TouchableRipple onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.subText}>{subText}</Text>
          </View>
          {isActive && <Image source={check} style={styles.icon} />}
        </View>
      </TouchableRipple>
      <Divider style={styles.divider} />
    </View>
  );
};

FridgeRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
    color: theme.colors.white,
  },
  subText: {
    fontSize: 16,
    color: theme.colors.silverMetallic,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    height: 1,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: theme.colors.silverMetallic,
    marginRight: 16,
  },
}));

export default FridgeRow;
