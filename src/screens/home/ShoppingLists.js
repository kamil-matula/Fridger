import React from 'react';

import { Text, View } from 'react-native';

import { makeStyles } from '../../utils';

const ShoppingLists = () => {
  const styles = useStyles();

  return (
    <View style={styles.contentStyle}>
      <Text style={styles.textStyle}>Shopping Lists</Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  textStyle: {
    color: theme.colors.text,
  },
}));

export default ShoppingLists;
