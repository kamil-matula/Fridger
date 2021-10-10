import React from 'react';

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { makeStyles } from '../../utils';
import { AppBar } from '../../components';

const Friends = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.pageStyle}>
      <AppBar label='Friends' />
      <View style={styles.contentStyle}>
        <Text style={styles.textStyle}>Friends</Text>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  pageStyle: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: theme.colors.text,
  },
}));

export default Friends;
