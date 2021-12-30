import React from 'react';

import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { displayToast } from 'utils';

const RemoveAccess = ({
  visible,
  setVisible,
  selectedOwnership,
  containerName,
  removeUser,
}) => {
  // Actions:
  const confirmRemoveFriend = () => removeFriend();
  const cancelRemoveFriend = () => setVisible(false);
  const removeFriend = () => {
    removeUser(selectedOwnership.id)
      .unwrap()
      .then(() => displayToast('Friend has been removed'))
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to remove friend')
      );
    setVisible(false);
  };

  return (
    <Dialog
      title='Remove friend'
      paragraph={`Are you sure you want to remove ${selectedOwnership?.user.username} from ${containerName}? This action cannot be undone.`}
      visibilityState={[visible, setVisible]}
      label1='remove'
      onPressLabel1={confirmRemoveFriend}
      label2='cancel'
      onPressLabel2={cancelRemoveFriend}
    />
  );
};

RemoveAccess.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  selectedOwnership: PropTypes.object,
  containerName: PropTypes.string.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default RemoveAccess;
