import React from 'react';

import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DrawerRow, Button, UserInfo } from 'components';
import { makeStyles } from 'utils';

const DrawerContent = ({ navigation }) => {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.drawerContent}>
      <UserInfo
        // TODO: Replace with real user name, nick and image
        text='Ardelle Coppage'
        subtext='Minkx'
        avatarURI='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
      />

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Account</Text>
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

      <View style={styles.buttonContainer}>
      <Button
        variant='outlined'
        label='LOGOUT'
        onPress={() => {
          // TODO: Add logging out
        }}
      />
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme) => ({
  drawerContent: {
    flex: 1,
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
  buttonContainer: {
    margin: 16,
  },
}));

export default DrawerContent;
