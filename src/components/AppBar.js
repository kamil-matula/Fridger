import React from 'react';

import { Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import PropTypes from 'prop-types';

import backIcon from '../../assets/images/back.png';
import drawerIcon from '../../assets/images/navigation/drawer.png';
import { makeStyles } from '../utils';

const AppBar = ({ label = '', isDrawer = false }) => {
  const styles = useStyles();
  const colors = useTheme().colors;
  const navigation = useNavigation();

  return (
    <Appbar style={styles.bar}>
      <Appbar.Action
        icon={isDrawer ? drawerIcon : backIcon}
        onPress={isDrawer ? () => navigation.openDrawer() : () => navigation.goBack()}
        color={isDrawer ? colors.silverMetallic : colors.text}
        size={isDrawer ? 32 : 24}
      />
      <Appbar.Content title={label} titleStyle={styles.title} />
    </Appbar>
  );
};

AppBar.propTypes = {
  label: PropTypes.string,
  isDrawer: PropTypes.bool,
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
  },
}));

export default AppBar;
