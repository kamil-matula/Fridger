import React from 'react';

import { Text, View } from 'react-native';

import { AppBar } from 'components';
import { makeStyles } from 'utils';

const Menu = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar isDrawer={true} />
      <View style={styles.container2}>
        <Text style={styles.text}>Menu</Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: theme.colors.text,
  },
}));

export default Menu;
