import React, { useEffect } from 'react';

import { BackHandler, View, Image } from 'react-native';
import { Text } from 'react-native-paper';

import { makeStyles } from 'utils';
import { noInternet } from 'assets/icons';

const NoConnection = () => {
  const styles = useStyles();

  // Lock standard back button behaviour:
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={noInternet} />
      <Text style={styles.offlineText}>You&apos;re offline.</Text>
      <Text style={styles.descriptionText}>
        To use this application, you need to connect to the internet.
      </Text>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '20%',
    backgroundColor: theme.colors.background,
  },
  offlineText: {
    textAlign: 'center',
    fontSize: 20,
  },
  descriptionText: {
    textAlign: 'center',
  },
  icon: {
    width: 196,
    height: 196,
    tintColor: theme.colors.white,
    marginBottom: 32,
  },
}));

export default NoConnection;
