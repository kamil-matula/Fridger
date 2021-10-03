import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../components';

const Friends = ({ navigation }) => {
  const colors = useTheme().colors;

  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1, backgroundColor: colors.background }}>
      <AppBar onPress={() => navigation.goBack()} label='Friends' />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.text }}>Friends</Text>
      </View>
    </SafeAreaView>
  );
};

export default Friends;
