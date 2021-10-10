import React from 'react';

import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBarWithDrawer, FridgeRow } from '../../components';
import { makeStyles } from '../../utils';

const DATA = [
  { id: '1', title: 'Home' },
  { id: '2', title: 'Bunker' },
  { id: '3', title: 'My fridge' },
];

const Fridges = ({ navigation }) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <AppBarWithDrawer onPress={() => navigation.openDrawer()} label='Fridges' />
      <Divider style={styles.divider}/>
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <FridgeRow title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    width: '100%',
  },
  list: {
    width: '100%',
  },
}));

export default Fridges;
