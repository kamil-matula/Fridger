import React from 'react';

import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, FridgeRow, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';

const DATA = [
  { id: '1', title: 'Home' },
  { id: '2', title: 'Bunker' },
  { id: '3', title: 'My fridge' },
];

const Fridges = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar isDrawer={true} label='Fridges' />
      <Divider style={styles.divider} />
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <FridgeRow title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton onPress={() => {
        // TODO: Add navigating to "Add Fridge Page"
      }}/>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    width: '100%',
    height: 1,
  },
  list: {
    width: '100%',
  },
}));

export default Fridges;
