import React from 'react';

import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { displayToast } from 'utils';
import { useDeleteFridgeProductMutation } from 'services/fridger/fridgeProducts';

const DeleteFridgeProduct = ({
  visible,
  setVisible,
  productID,
  productName,
  fridgeName,
  navigation,
}) => {
  // Queries:
  const [deleteProductQuery] = useDeleteFridgeProductMutation();

  // Actions:
  const confirmRemoveProduct = () => deleteProduct();
  const cancelRemoveProduct = () => setVisible(false);
  const deleteProduct = () => {
    deleteProductQuery(productID)
      .unwrap()
      .then(() => {
        displayToast('Product deleted');
        setVisible(false);
        navigation.pop();
      })
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to delete product')
      );
  };

  return (
    <Dialog
      title='Delete product'
      paragraph={`Are you sure you want to delete product ${productName} from fridge ${fridgeName}? This action cannot be undone.`}
      visibilityState={[visible, setVisible]}
      label1='delete'
      onPressLabel1={confirmRemoveProduct}
      label2='cancel'
      onPressLabel2={cancelRemoveProduct}
    />
  );
};

DeleteFridgeProduct.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  productID: PropTypes.string,
  productName: PropTypes.string,
  fridgeName: PropTypes.string,
};

export default DeleteFridgeProduct;
