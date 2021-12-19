import React from 'react';

import { Dialog } from 'components';
import { displayToast } from 'utils';
import { useDeleteFridgeMutation } from 'services/fridger/fridges';
import PropTypes from 'prop-types';

const DeleteFridge = ({ visible, setVisible, fridge, navigation }) => {
  // Queries:
  const [deleteFridgeQuery] = useDeleteFridgeMutation();

  // Actions:
  const confirmRemoveFridge = () => deleteFridge();
  const cancelRemoveFridge = () => setVisible(false);
  const deleteFridge = () => {
    if (fridge)
      deleteFridgeQuery(fridge.id)
        .unwrap()
        .then(() => {
          displayToast('Fridge deleted');
          setVisible(false);
          navigation.pop();
        })
        .catch((error) =>
          displayToast(
            error.data?.non_field_errors || 'Unable to delete fridge'
          )
        );
  };

  return (
    <Dialog
      title='Delete fridge'
      paragraph={`Are you sure you want to delete fridge ${fridge?.name}? This action cannot be undone.`}
      visibilityState={[visible, setVisible]}
      label1='delete'
      onPressLabel1={confirmRemoveFridge}
      label2='cancel'
      onPressLabel2={cancelRemoveFridge}
    />
  );
};

DeleteFridge.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  fridge: PropTypes.object,
};

export default DeleteFridge;
