import React from 'react';

import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { displayToast } from 'utils';
import { useDeleteFriendMutation } from 'services/fridger/friends';

const DeleteFriend = ({
  visible,
  setVisible,
  relationshipID,
  friendUsername,
  navigation,
}) => {
  // Queries:
  const [deleteFriendQuery] = useDeleteFriendMutation();

  // Actions:
  const confirmRemoveFriend = () => deleteFriend();
  const cancelRemoveFriend = () => setVisible(false);
  const deleteFriend = () => {
    if (relationshipID) {
      deleteFriendQuery(relationshipID)
        .unwrap()
        .then(() => {
          displayToast('Friend has been deleted');
          if (navigation) navigation.pop(); // close FriendProfile
        })
        .catch((error) =>
          displayToast(
            error.data?.non_field_errors || 'Unable to remove friend'
          )
        );
      setVisible(false);
    }
  };

  return (
    <Dialog
      title='Remove from friends'
      paragraph={`Are you sure you want to remove ${friendUsername} from friends? This action cannot be undone.`}
      visibilityState={[visible, setVisible]}
      label1='remove'
      onPressLabel1={confirmRemoveFriend}
      label2='cancel'
      onPressLabel2={cancelRemoveFriend}
    />
  );
};

DeleteFriend.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  relationshipID: PropTypes.string,
  friendUsername: PropTypes.string,
};

export default DeleteFriend;
