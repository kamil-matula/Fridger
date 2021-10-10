import React from 'react';

import { Text, View } from 'react-native';

import { makeStyles } from '../../utils';

const Menu = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Menu</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
  },
}));

export default Menu;
