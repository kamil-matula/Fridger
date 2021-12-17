import React, { useState } from 'react';

import { View, Image, ScrollView } from 'react-native';

import { makeStyles, displayToast } from 'utils';
import { UserDataRow, AppBar, Separator, Dialog } from 'components';
import { deleteIcon } from 'assets/icons';
import { tmpPerson } from 'assets/images';
import { useDeleteFriendMutation } from 'services/fridger/friends';

const FriendProfile = ({ navigation, route }) => {
  const styles = useStyles();
  const { relationshipType, relationshipID, nick, name, surname, avatarUri } =
    route.params;

  // Queries:
  const deleteFriendQuery = useDeleteFriendMutation()[0];

  // Deleting friend:
  const [dialogVisible, setDialogVisible] = useState(false);
  const removeFriend = () => {
    // Send request to api:
    deleteFriendQuery(relationshipID)
      .unwrap()
      .then(() => {
        displayToast('Friend has been deleted');
        navigation.pop();
      })
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to remove friend')
      );

    // Hide dialog and go back:
    setDialogVisible(false);
  };
  const cancelRemoveFriend = () => setDialogVisible(false);

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
      <Dialog
        title='Remove from friends'
        paragraph={`Are you sure you want to remove ${nick} from friends? This action cannot be undone.`}
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
