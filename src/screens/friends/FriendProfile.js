import React, { useState } from 'react';

import { View, Image, ScrollView } from 'react-native';

import { makeStyles } from 'utils';
import { UserDataRow, AppBar, Separator, Dialog } from 'components';
import { deleteIcon } from 'assets/icons';
import { tmpPerson } from 'assets/images';

const FriendProfile = ({ navigation, route }) => {
  const styles = useStyles();
  const { userID, nick, name, surname, avatarUri } = route.params;

  const friend = {
    avatarUri,
    nick,
    name,
    surname,
  };

  // Deleting:
  const [dialogVisible, setDialogVisible] = useState(false);
  const removeFriend = () => {
    // TODO: Send request to API and wait for removing friend from the list
    console.log(`Friend with ID ${userID} has been deleted`);

    // Hide dialog and go back:
    setDialogVisible(false);
    navigation.pop();
  };
  const cancelRemoveFriend = () => {
    setDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Main content */}
      <AppBar icon1={deleteIcon} onPressIcon1={() => setDialogVisible(true)} />
      <ScrollView style={styles.SVcontainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.avatar}
            source={
              friend.avatarUri !== null ? { uri: friend.avatarUri } : tmpPerson
            }
          />
        </View>
        <UserDataRow label='Nick' data={friend.nick} />
        <Separator height={32} />
        <UserDataRow label='Name' data={friend.name} />
        <Separator height={32} />
        <UserDataRow label='Surname' data={friend.surname} />
      </ScrollView>

      {/* Deleting friend */}
      <Dialog
        title='Remove from friends'
        paragraph={`Are you sure you want to remove ${friend.nick} from friends? This action cannot be undone.`}
        visibilityState={[dialogVisible, setDialogVisible]}
        label1='remove'
        onPressLabel1={removeFriend}
        label2='cancel'
        onPressLabel2={cancelRemoveFriend}
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