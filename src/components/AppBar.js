import React from 'react';

import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import PropTypes from 'prop-types';

import backIcon from 'assets/images/back.png';
import drawerIcon from 'assets/images/navigation/drawer.png';
import { makeStyles } from 'utils';

const AppBar = ({
  label = '',
  isDrawer = false,
  icon1 = null,
  onPressIcon1 = null,
  icon2 = null,
  onPressIcon2 = null,
}) => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.bar}>
      {isDrawer && (
        <Appbar.Action
          icon={drawerIcon}
          onPress={() => navigation.openDrawer()}
          color={colors.silverMetallic}
        />
      )}
      {!isDrawer && (
        <Appbar.Action
          icon={backIcon}
          onPress={() => navigation.pop()}
          color={colors.text}
        />
      )}
      <Appbar.Content title={label} titleStyle={styles.title} />
      {icon1 && (
        <Appbar.Action
          icon={icon1}
          color={colors.silverMetallic}
          onPress={onPressIcon1}
        />
      )}
      {icon2 && (
        <Appbar.Action
          icon={icon2}
          color={colors.silverMetallic}
          onPress={onPressIcon2}
        />
      )}
    </Appbar.Header>
  );
};

AppBar.propTypes = {
  label: PropTypes.string,
  isDrawer: PropTypes.bool,
  icon1: PropTypes.number,
  onPressIcon1: PropTypes.func,
  icon2: PropTypes.number,
  onPressIcon2: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  bar: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.text,
    textTransform: 'capitalize',
  },
}));

export default AppBar;
