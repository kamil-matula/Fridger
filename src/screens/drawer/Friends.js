import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../components';

const Friends = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles(theme).pageStyle}>
      <AppBar onPress={() => navigation.goBack()} label='Friends' />
      <View style={styles(theme).contentStyle}>
        <Text style={styles(theme).textStyle}>Friends</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = (theme) =>
  StyleSheet.create({
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
  });

export default Friends;
