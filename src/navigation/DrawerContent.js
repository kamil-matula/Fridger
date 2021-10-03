import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Avatar, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerRow, EmptyButton } from '../components';

export function DrawerContent({ navigation }) {
  const colors = useTheme().colors;

  return (
    <SafeAreaView style={[styles.drawerContent, { backgroundColor: colors.primary }]}>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            // TODO: Replace with real user image
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          }}
          size={64}
        />
        <View style={styles.nameAndNickColumn}>
          <Text style={[styles.name, { color: colors.text }]}>Ardelle Coppage</Text>
          <Text style={[styles.nick, { color: colors.silverMetallic }]}>Minkx</Text>
        </View>
      </View>

      <Divider style={{ backgroundColor: colors.text }} />

      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <Text style={[styles.sectionName, { color: colors.silverMetallic }]}>Account</Text>
        <DrawerRow
          label='Edit Profile'
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
        />
        <DrawerRow
          label='Change Password'
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
        />
        <DrawerRow
          label='Friends'
          onPress={() => {
            navigation.navigate('Friends');
          }}
        />
        <DrawerRow
          label='Delete Account'
          onPress={() => {
            navigation.navigate('DeleteAccount');
          }}
        />
      </View>

      <EmptyButton
        label='LOGOUT'
        onPress={() => {
          // TODO: Add logging out
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingBottom: 50,
  },
  userInfoSection: {
    flexDirection: 'row',
    margin: 16,
  },
  nameAndNickColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
  },
  nick: {
    fontSize: 18,
  },
  sectionName: {
    fontSize: 18,
    marginVertical: 16,
  },
});
