import React from 'react';

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBarWithDrawer } from '../../components';
import { makeStyles } from '../../utils';

const ShoppingLists = ({ navigation }) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <AppBarWithDrawer onPress={() => navigation.openDrawer()} label='Shopping Lists' />
      <View style={styles.container}>
        <Text style={styles.text}>Shopping Lists</Text>
      </View>
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
  text: {
    color: theme.colors.text,
  },
}));

export default ShoppingLists;
