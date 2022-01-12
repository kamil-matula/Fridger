import React from 'react';

import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';

import {
  ActivityIndicator,
  AppBar,
  FloatingActionButton,
  Placeholder,
  Separator,
} from 'components';
import { FridgeRow } from 'components/fridges';
import { makeStyles } from 'utils';
import { useFridgesQuery } from 'services/fridger/fridges';

const Fridges = ({ navigation }) => {
  const styles = useStyles();

  // Queries:
  const fridges = useFridgesQuery(null, { pollingInterval: 5000 });

  return (
    <View style={styles.container}>
      <AppBar isDrawer label='Fridges' />
      <Divider />

      {/* List of fridges */}
      {fridges.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {fridges.data?.length > 0 ? (
            <ScrollView>
              {fridges.data.map((item) => (
                <FridgeRow
                  key={item.id}
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
              ))}

              {/* Space for FAB and nav bar */}
              <Separator height={54 + 88} />
            </ScrollView>
          ) : (
            <>
              <Placeholder content='No fridges to display' />
              {/* Space for nav bar */}
              <Separator height={54} />
            </>
          )}
        </>
      )}

      {/* Adding new fridge */}
      <FloatingActionButton
        onPress={() => navigation.navigate('AddFridge')}
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
