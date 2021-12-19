import React, { useState } from 'react';

import { View, Image, ScrollView } from 'react-native';

import { makeStyles } from 'utils';
import { UserDataRow, AppBar, Separator } from 'components';
import { deleteIcon } from 'assets/icons';
import { tmpPerson } from 'assets/images';
import { DeleteFriend } from 'dialogs';

const FriendProfile = ({ navigation, route }) => {
  const styles = useStyles();
  const { relationshipType, relationshipID, nick, name, surname, avatarUri } =
    route.params;

  // Deleting friend:
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Friend can be deleted only if the invitation has been already accepted */}
      {relationshipType === 'request' ? (
        <AppBar />
      ) : (
        <AppBar
          icon1={deleteIcon}
          onPressIcon1={() => setDialogVisible(true)}
        />
      )}

      {/* Main content */}
      <ScrollView style={styles.SVcontainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.avatar}
            source={avatarUri !== null ? { uri: avatarUri } : tmpPerson}
          />
        </View>
        <UserDataRow label='Nick' data={nick} />
        <Separator height={32} />
        <UserDataRow label='Name' data={name} />
        <Separator height={32} />
        <UserDataRow label='Surname' data={surname} />
      </ScrollView>

      {/* Deleting friend */}
      <DeleteFriend
        visible={dialogVisible}
        setVisible={setDialogVisible}
        relationshipID={relationshipID}
        friendUsername={nick}
        navigation={navigation}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  SVcontainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: theme.colors.silverMetallic,
  },
}));

export default FriendProfile;
