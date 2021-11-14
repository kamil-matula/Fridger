import React from 'react';

import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DrawerRow, Button, UserInfo } from 'components';
import { makeStyles } from 'utils';
import { useLogoutMutation } from 'services/fridger/auth';

const DrawerContent = ({ navigation }) => {
  const styles = useStyles();

  const logoutPost = useLogoutMutation()[0];

  return (
    <SafeAreaView style={styles.drawerContent}>
      <UserInfo
        // TODO: Replace with real user name, nick and image
        title='Ardelle Coppage'
        subtitle='Minkx'
        avatarURI='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        variant='big'
      />

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionName}>Account</Text>
        <DrawerRow
          label='Edit Profile'
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('EditProfile');
          }}
        />
        <DrawerRow
          label='Change Password'
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('ChangePassword');
          }}
        />
        <DrawerRow
          label='Friends'
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Friends');
          }}
        />
        <DrawerRow
          label='Delete Account'
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('DeleteAccount');
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant='outlined'
          label='LOGOUT'
          onPress={() => {
            logoutPost();
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
    backgroundColor: theme.colors.white,
  },
  buttonContainer: {
    margin: 16,
  },
}));

export default DrawerContent;
