import React from 'react';
import { BackHandler, View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function NoConnection() {
  const { colors } = useTheme();

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
    <View style={[style.container, { backgroundColor: colors.background }]}>
      {/* TODO: Add nice image */}
      <Text style={style.offlineText}>You&apos;re offline.</Text>
      <Text style={style.descriptionText}>
        To use this application, you need to connect to the internet.
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '20%',
  },
  image: {
    maxWidth: '150%',
    borderRadius: 5,
  },
  offlineText: {
    textAlign: 'center',
    fontSize: 20,
  },
  descriptionText: {
    textAlign: 'center',
  },
});
