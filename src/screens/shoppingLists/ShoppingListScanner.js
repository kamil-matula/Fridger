import React from 'react';

import { View } from 'react-native';

import { ScrollViewLayout, AppBar } from 'components';
import { makeStyles } from 'utils';

const ShoppingListScanner = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar label='Shopping Lists' />
      <ScrollViewLayout addPadding={false} />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default ShoppingListScanner;
