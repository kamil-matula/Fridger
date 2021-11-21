import React from 'react';

import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, FloatingActionButton } from 'components';
import { FridgeRow } from 'components/fridges';
import { makeStyles } from 'utils';
import { fridgesList } from 'tmpData';

const Fridges = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Fridges' />
      <Divider style={styles.divider} />
      <FlatList
        data={fridgesList}
        renderItem={({ item }) => (
          <FridgeRow
            fridgeName={item.name}
            onPress={() => {
              // Go to specific fridge:
              navigation.navigate('FridgeDetails', {
                fridgeID: item.id,
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
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
}));

export default Fridges;
