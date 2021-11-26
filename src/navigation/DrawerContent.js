import React from 'react';

import { View, ActivityIndicator } from 'react-native';
import { Text, Divider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DrawerRow, Button, UserInfo } from 'components';
import { makeStyles } from 'utils';
import { useLogoutMutation } from 'services/fridger/auth';
import { useUserInfoQuery } from 'services/fridger/user';

const DrawerContent = ({ navigation }) => {
  const styles = useStyles();
  const { colors } = useTheme();

  // Communication with API:
  const [logoutPost, { isLoading }] = useLogoutMutation();
  const { data: userData, isLoading: userIsLoading } = useUserInfoQuery();

  return (
    <SafeAreaView style={styles.drawerContent}>
      {/* Logged-in user info */}
      {userIsLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size='large' color={colors.blueJeans} />
        </View>
      ) : (
        <UserInfo
          title={userData ? userData?.username : ''}
          subtitle={
            userData?.first_name && userData?.last_name
              ? `${userData?.first_name} ${userData?.last_name}`
              : null
          }
          avatarURI={userData?.avatar}
          variant='big'
          containerWidth={160}
        />
      )}
      <Divider style={styles.divider} />

      {/* Other screens */}
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

      {/* Logging out */}
      <View style={styles.buttonContainer}>
        <Button
          variant='outlined'
          label='LOGOUT'
          onPress={() => {
            logoutPost();
          }}
          isLoading={isLoading}
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
    width: 280,
  },
  divider: {
    backgroundColor: theme.colors.white,
  },
  buttonContainer: {
    margin: 16,
  },
  indicatorContainer: { width: 160, height: 80 },
}));

export default DrawerContent;
