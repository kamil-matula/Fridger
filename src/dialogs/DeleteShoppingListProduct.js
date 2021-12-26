import React from 'react';

import PropTypes from 'prop-types';

import { Dialog } from 'components';
import { displayToast } from 'utils';
import { useDeleteShoppingListProductMutation } from 'services/fridger/shoppingListProducts';

const DeleteShoppingListProduct = ({
  visible,
  setVisible,
  productID,
  productName,
  navigation,
}) => {
  // Queries:
  const deleteProductQuery = useDeleteShoppingListProductMutation()[0];

  // Actions:
  const confirmRemoveProduct = () => {
    deleteProductQuery({ id: productID })
      .unwrap()
      .then(() => {
        setVisible(false);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        displayToast(
          error.data?.non_field_errors || 'Unable to delete product'
        );
      });
  };
  const cancelRemoveProduct = () => setVisible(false);

  return (
    <Dialog
      title='Delete product'
      paragraph={`Are you sure you want to delete ${productName} from this shopping list? This action cannot be undone.`}
      visibilityState={[visible, setVisible]}
      label1='remove'
      onPressLabel1={confirmRemoveProduct}
      label2='cancel'
      onPressLabel2={cancelRemoveProduct}
    />
  );
};

DeleteShoppingListProduct.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  productID: PropTypes.string,
  productName: PropTypes.string,
};

export default DeleteShoppingListProduct;
