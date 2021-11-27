import React from 'react';

import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, FloatingActionButton } from 'components';
import { FridgeRow } from 'components/fridges';
import { makeStyles } from 'utils';
import { fridgesList } from 'tmpData';

const ChooseFridge = ({ route, navigation }) => {
  const { activeFridgeName } = route.params;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar label='Choose fridge' />
      <Divider />

      {/* List of available fridges (including active one) */}
      <FlatList
        style={styles.list}
        data={fridgesList}
        renderItem={({ item }) => (
          <FridgeRow
            isActive={item.name === activeFridgeName}
            text={item.name}
            subText={
              item.people > 1
                ? `${item.items} items  •  shared with ${
                    item.people - 1
                  } friends`
                : `${item.items} items`
            }
            onPress={() => {
              // TODO: Add connecting this fridge with shopping list
              console.log(`Fridge ${item.name} has been selected as active`);
              navigation.pop();
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Adding new fridge */}
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
  list: {
    width: '100%',
  },
}));

export default ChooseFridge;
