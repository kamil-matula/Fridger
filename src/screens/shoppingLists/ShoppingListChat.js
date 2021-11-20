import React from 'react';

import { View } from 'react-native';

import { ScrollViewLayout } from 'components';
import { makeStyles } from 'utils';

const ShoppingListChat = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
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

export default ShoppingListChat;
