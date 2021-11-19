import React from 'react';

import { View } from 'react-native';

import { makeStyles } from 'utils';
import { AppBar, FloatingActionButton } from 'components';
import ShoppingListTabNavigator from 'navigation/ShoppingListTabNavigator';

const ShoppingLists = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Shopping Lists' />
      <ShoppingListTabNavigator />
      <FloatingActionButton
        onPress={() => navigation.navigate('AddShoppingList')}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.white,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
  },
}));

export default ShoppingLists;
