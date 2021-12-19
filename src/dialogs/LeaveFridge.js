import React from 'react';

import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { displayToast } from 'utils';
import { useRemoveFridgeUserMutation } from 'services/fridger/fridgesOwnerships';

const LeaveFridge = ({ visible, setVisible, fridge, navigation }) => {
  // Queries:
  const [removeFridgeUserQuery] = useRemoveFridgeUserMutation();

  // Actions:
  const confirmLeaveFridge = () => leaveFridge();
  const cancelLeaveFridge = () => setVisible(false);
  const leaveFridge = () => {
    removeFridgeUserQuery(fridge.my_ownership.id)
      .unwrap()
      .then(() => {
        displayToast('Left fridge');
        setVisible(false);
        navigation.pop();
      })
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to leave fridge')
      );
  };

  return (
    <Dialog
      title='Leave fridge'
      paragraph='Are you sure you want to leave this fridge? This action cannot be undone.'
      visibilityState={[visible, setVisible]}
      label1='leave'
      onPressLabel1={confirmLeaveFridge}
      label2='cancel'
      onPressLabel2={cancelLeaveFridge}
    />
  );
};

LeaveFridge.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  fridge: PropTypes.object,
};

export default LeaveFridge;
