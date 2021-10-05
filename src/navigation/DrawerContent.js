import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerRow, EmptyButton, UserInfo } from '../components';

const DrawerContent = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles(theme).drawerContent}>
      <UserInfo
        text='Ardelle Coppage'
        subtext='Minkx'
        avatarURI={{
          // TODO: Replace with real user image
          uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        }}
      />

      <Divider style={styles(theme).divider} />

      <View style={styles(theme).section}>
        <Text style={styles(theme).sectionName}>Account</Text>
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
};

const styles = (theme) =>
  StyleSheet.create({
    drawerContent: {
      flex: 1,
      paddingBottom: 50,
      backgroundColor: theme.colors.primary,
    },
    section: {
      marginHorizontal: 16,
      flex: 1,
    },
    sectionName: {
      fontSize: 18,
      marginVertical: 16,
      color: theme.colors.silverMetallic,
    },
    divider: {
      backgroundColor: theme.colors.text,
    },
  });

export default DrawerContent;
