import React from 'react';

import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, FridgeRow, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';
import { fridgesList } from 'tmpData';

const ChooseFridge = ({ route, navigation }) => {
  const { activeFridgeName } = route.params;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar label='Choose fridge' />
      <Divider style={styles.divider} />

      {/* List of available fridges (including active one) */}
      <FlatList
        style={styles.list}
        data={fridgesList}
        renderItem={({ item }) => (
          <FridgeRow
            isActive={item.name === activeFridgeName}
            fridgeName={item.name}
            onPress={() => {
              // TODO: Add connecting this fridge with shopping list
              console.log(`Fridge ${item.name} has been selected as active`);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
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
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    width: '100%',
    height: 1,
  },
  list: {
    width: '100%',
  },
}));

export default ChooseFridge;
