import React, { useState, useMemo } from 'react';

import { View, Text, ScrollView } from 'react-native';
import { useTheme, Snackbar, Divider } from 'react-native-paper';

import {
  AppBar,
  UserInfo,
  Separator,
  FloatingActionButton,
  LoadingOverlay,
} from 'components';
import { displayToast, makeStyles } from 'utils';
import { done, clear, deleteIcon } from 'assets/icons';

import {
  useFriendsQuery,
  useDeleteFriendMutation,
  useAcceptFriendMutation,
} from 'services/fridger/friends';
import { DeleteFriend } from 'dialogs';

const Friends = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  // Queries:
  const deleteFriendQuery = useDeleteFriendMutation()[0];
  const acceptFriendQuery = useAcceptFriendMutation()[0];
  const requests = useFriendsQuery({ isAccepted: false });
  const friends = useFriendsQuery({ isAccepted: true });

  // Prepare to remove friend:
  const [relationshipToRemove, setRelationshipToRemove] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(null);
  const prepareToRemove = (relationship) => {
    setRelationshipToRemove(relationship);
    setDialogVisible(true);
  };

  // Accept invitation:
  const acceptInvitation = (relationshipID) => {
    acceptFriendQuery(relationshipID)
      .unwrap()
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to accept invitation'
        )
      );
  };

  // Reject invitation:
  const [rejectedInvitationID, setRejectedInvitationID] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(null);
  const [rejectCanceled, setRejectCanceled] = useMemo(() => {
    let state = false;
    return [
      () => state,
      (newState) => {
        state = newState;
      },
    ];
  }, []);

  const onDismissSnackBar = () => {
    // If not undone, send request to API:
    if (!rejectCanceled()) {
      deleteInvitation(rejectedInvitationID);
    }

    // Hide snackbar:
    setRejectCanceled(false);
    setSnackbarVisible(false);
  };

  const rejectInvitation = (relationshipID) => {
    setRejectedInvitationID(relationshipID);
    setSnackbarVisible(true);
  };

  const undoRejection = () => {
    setRejectCanceled(true);
    setRejectedInvitationID(null);
    setSnackbarVisible(false);
  };

  const deleteInvitation = (relationshipID) => {
    deleteFriendQuery(relationshipID)
      .unwrap()
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to remove invitation'
        )
      );
  };

  // Navigation:
  const navigateToFriendProfile = (relationship, relationshipType) => {
    try {
      // Change page:
      navigation.navigate('FriendProfile', {
        relationshipType,
        relationshipID: relationship.id,
        nick: relationship.friend.username,
        name: relationship.friend.first_name,
        surname: relationship.friend.last_name,
        avatarUri: relationship.friend.avatar,
      });
    } catch (error) {
      displayToast("Unable to navigate to friend's profile");
    }
  };
  const navigateToAddFriend = () => navigation.navigate('AddFriend');

  // Helper variable - requests that were sent to me and were not rejected by me:
  const validRequests = requests.data
    ? requests.data.filter(
        (relationship) =>
          relationship.id !== rejectedInvitationID &&
          !relationship.is_my_request
      )
    : [];

  return (
    <View style={styles.container}>
      <AppBar label='Friends' />
      <Divider />

      {requests.isLoading || friends.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          {/* Invitations */}
          {validRequests.length !== 0 && (
            <>
              <Text style={styles.header}>Pending requests</Text>
              {validRequests.map((relationship) => (
                <UserInfo
                  key={relationship.id}
                  title={relationship.friend.username}
                  subtitle={`${relationship.friend.first_name} ${relationship.friend.last_name}`.trim()}
                  avatarURI={relationship.friend.avatar}
                  onClick={() =>
                    navigateToFriendProfile(relationship, 'request')
                  }
                  variant='small'
                  icon1={clear}
                  onPressIcon1={() => rejectInvitation(relationship.id)}
                  iconTint1={colors.tartOrange}
                  icon2={done}
                  onPressIcon2={() => acceptInvitation(relationship.id)}
                  iconTint2={colors.darkGreen}
                />
              ))}
            </>
          )}

          {/* Line between the lists */}
          {validRequests.length !== 0 && friends.data.length !== 0 && (
            <Divider />
          )}

          {/* Existing friends */}
          {friends.data.length !== 0 && (
            <>
              <Text style={styles.header}>Accepted requests</Text>
              {friends.data.map((relationship) => (
                <UserInfo
                  key={relationship.id}
                  title={relationship.friend.username}
                  subtitle={`${relationship.friend.first_name} ${relationship.friend.last_name}`.trim()}
                  avatarURI={relationship.friend.avatar}
                  onClick={() =>
                    navigateToFriendProfile(relationship, 'friend')
                  }
                  variant='small'
                  icon1={deleteIcon}
                  onPressIcon1={() => prepareToRemove(relationship)}
                  iconTint1={colors.silverMetallic}
                />
              ))}
            </>
          )}

          {/* Space for FAB */}
          <Separator height={80} />
        </ScrollView>
      )}

      {/* Deleting friend */}
      <DeleteFriend
        visible={dialogVisible}
        setVisible={setDialogVisible}
        relationshipID={relationshipToRemove?.id}
        friendUsername={relationshipToRemove?.friend.username}
      />

      {/* Undoing request rejection */}
      <Snackbar
        style={styles.snackbar}
        duration={5000}
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'undo',
          onPress: undoRejection,
        }}
      >
        <Text style={styles.snackbarText}>Friend request rejected</Text>
      </Snackbar>

      {/* Adding new friend */}
      {!snackbarVisible && (
        <FloatingActionButton onPress={navigateToAddFriend} />
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  text: {
    color: theme.colors.white,
    fontSize: 14,
  },
  userID: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    height: 24,
    width: 24,
    margin: 8,
    tintColor: theme.colors.silverMetallic,
  },
  snackbar: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
  },
  snackbarText: {
    color: theme.colors.white,
  },
}));

export default Friends;
