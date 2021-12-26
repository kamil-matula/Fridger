import React from 'react';

import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { displayToast } from 'utils';
import { useRemoveShoppingListUserMutation } from 'services/fridger/shoppingListsOwnerships';

const LeaveShoppingList = ({
  visible,
  setVisible,
  shoppingListOwnershipId,
  navigation,
}) => {
  // Queries:
  const [removeShoppingListUser] = useRemoveShoppingListUserMutation();

  // Actions:
  const cancelLeaveShoppingList = () => setVisible(false);
  const confirmLeaveShoppingList = () => {
    removeShoppingListUser(shoppingListOwnershipId)
      .unwrap()
      .then(() => {
        displayToast('You have left shopping list');
        setVisible(false);
        navigation.goBack();
      })
      .catch((error) => {
        displayToast(
          error.data?.non_field_errors || 'Unable to leave shopping list'
        );
      });
  };

  return (
    <Dialog
      title='Leave shopping list'
      paragraph='Are you sure you want to leave this shopping list? This action cannot be undone.'
      visibilityState={[visible, setVisible]}
      label1='leave'
      onPressLabel1={confirmLeaveShoppingList}
      label2='cancel'
      onPressLabel2={cancelLeaveShoppingList}
    />
  );
};

LeaveShoppingList.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  shoppingListOwnershipId: PropTypes.string,
};

export default LeaveShoppingList;
