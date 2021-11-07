import React from 'react';

import { View } from 'react-native';

import { makeStyles } from 'utils';

const ShoppingListDetails = () => {
  const styles = useStyles();
  return <View style={styles.container} />;
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default ShoppingListDetails;
