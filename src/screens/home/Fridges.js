import React from 'react';

import { FlatList, View } from 'react-native';
import { Divider } from 'react-native-paper';

import {
  AppBar,
  FloatingActionButton,
  LoadingOverlay,
  Separator,
} from 'components';
import { FridgeRow } from 'components/fridges';
import { makeStyles } from 'utils';
import { useFridgesQuery } from 'services/fridger/fridges';

const Fridges = ({ navigation }) => {
  const styles = useStyles();

  // Queries:
  const fridges = useFridgesQuery();

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Fridges' />
      <Divider />

      {/* List of fridges */}
      {fridges.isLoading ? (
        <LoadingOverlay />
      ) : (
        <FlatList
          data={fridges.data}
          renderItem={({ item }) => (
            <FridgeRow
              text={item.name}
              subText={
                item.shared_with_count > 0
                  ? `${item.products_count} items  •  shared with ${item.shared_with_count} friends`
                  : `${item.products_count} items`
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
      )}

      {/* Space for bottom nav bar */}
      <Separator height={54} />

      {/* Adding new fridge */}
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddFridge');
        }}
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

export default Fridges;
