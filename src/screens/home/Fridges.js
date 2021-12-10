import React, { useState, useEffect } from 'react';

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
  const { data, isLoading } = useFridgesQuery();

  // Data:
  const [fridges, setFridges] = useState([]);

  // Update fridges when data is fetched:
  useEffect(() => {
    if (data) {
      setFridges(
        data.map((e) => ({
          id: e.id,
          name: e.name,
          items: e.products_count,
          people: e.shared_with_count,
        }))
      );
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Fridges' />
      <Divider />

      {/* List of fridges */}
      <FlatList
        data={fridges}
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

      {/* Space for bottom nav bar */}
      <Separator height={54} />

      {/* Adding new fridge */}
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddFridge');
        }}
        isBottomNavigationBar
      />

      {/* Loading */}
      {isLoading && <LoadingOverlay />}
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
