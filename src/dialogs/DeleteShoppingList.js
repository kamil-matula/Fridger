import React from 'react';

import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { displayToast } from 'utils';
import { useDeleteShoppingListMutation } from 'services/fridger/shoppingLists';

const DeleteShoppingList = ({
  visible,
  setVisible,
  shoppingList,
  navigation,
}) => {
  // Queries:
  const deleteShoppingListQuery = useDeleteShoppingListMutation()[0];

  // Actions:
  const confirmRemoveShoppingList = () => deleteShoppingList();
  const cancelRemoveShoppingList = () => setVisible(false);
  const deleteShoppingList = () => {
    if (shoppingList)
      deleteShoppingListQuery(shoppingList.id)
        .unwrap()
        .then(() => {
          displayToast('Shopping list deleted');
          setVisible(false);
          navigation.pop();
        })
        .catch(() => displayToast('Unable to delete shopping list'));
  };

  return (
    <Dialog
      title='Delete shopping list'
      paragraph={`Are you sure you want to delete shopping list ${shoppingList?.name}? This action cannot be undone.`}
      visibilityState={[visible, setVisible]}
      label1='delete'
      onPressLabel1={confirmRemoveShoppingList}
      label2='cancel'
      onPressLabel2={cancelRemoveShoppingList}
    />
  );
};

DeleteShoppingList.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  shoppingList: PropTypes.object,
};

export default DeleteShoppingList;
