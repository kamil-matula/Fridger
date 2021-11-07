import React from 'react';

import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, FridgeRow, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';
import { fridgesList } from 'tmpData';

const Fridges = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Fridges' />
      <Divider style={styles.divider} />
      <FlatList
        style={styles.list}
        data={fridgesList}
        renderItem={({ item }) => (
          <FridgeRow fridgeID={item.id} title={item.title} />
        )}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddFridge');
        }}
      />
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
