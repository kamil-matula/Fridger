import React, { useState } from 'react';

import { View } from 'react-native';

import { makeStyles } from 'utils';
import { AppBar, FloatingActionButton, Separator } from 'components';
import ShoppingListTabNavigator from 'navigation/ShoppingListTabNavigator';

const ShoppingLists = ({ navigation }) => {
  const styles = useStyles();

  // FAB conditions:
  const [fabVisible, setFabVisible] = useState(true);

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Shopping Lists' />

      {/* Main content */}
      <ShoppingListTabNavigator setFabVisible={setFabVisible} />

      {/* Space for bottom nav bar */}
      <Separator height={54} />

      {/* Adding new shopping list */}
      <FloatingActionButton
        visible={fabVisible}
        onPress={() => navigation.navigate('AddShoppingList')}
        isBottomNavigationBar
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default ShoppingLists;
