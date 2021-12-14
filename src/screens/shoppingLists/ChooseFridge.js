/* eslint-disable camelcase */
import React from 'react';

import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { AppBar, FloatingActionButton, LoadingOverlay } from 'components';
import { FridgeRow } from 'components/fridges';
import { makeStyles } from 'utils';
import { useFridgesQuery } from 'services/fridger/fridges';

const ChooseFridge = ({ route, navigation }) => {
  const { activeFridgeName } = route.params;
  const styles = useStyles();

  // Queries:
  const fridges = useFridgesQuery();

  return (
    <View style={styles.container}>
      <AppBar label='Choose fridge' />
      <Divider />

      {fridges.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          {fridges.data.map((fridge) => (
            <FridgeRow
              key={fridge.id}
              isActive={fridge.name === activeFridgeName}
              text={fridge.name}
              subText={
                fridge.shared_with_count > 0
                  ? `${fridge.products_count} items  •  shared with ${fridge.shared_with_count} friends`
                  : `${fridge.products_count} items`
              }
              onPress={() => navigation.navigate('AddShoppingList', { fridge })}
            />
          ))}
        </ScrollView>
      )}

      {/* Adding new fridge */}
      <FloatingActionButton onPress={() => navigation.navigate('AddFridge')} />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default ChooseFridge;
