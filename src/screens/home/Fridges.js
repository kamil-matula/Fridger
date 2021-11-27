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
      <Divider />
      <FlatList
        data={fridgesList}
        renderItem={({ item }) => (
          <FridgeRow
            text={item.name}
            subText={
              item.people > 1
                ? `${item.items} items  •  shared with ${
                    item.people - 1
                  } friends`
                : `${item.items} items`
            }
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
}));

export default Fridges;
