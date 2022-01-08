import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { Dialog, RadioButtonGroup, Separator, InputField } from 'components';
import { displayToast, convertToNumber } from 'utils';
import { useUpdateFridgeProductQuantityMutation } from 'services/fridger/fridgeProducts';

const ReduceQuantity = ({ item, setItem }) => {
  // Queries:
  const [editFridgeQuantityQuery] = useUpdateFridgeProductQuantityMutation();

  // States:
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState(null);
  const { control, reset, setValue, getValues } = useForm({
    defaultValues: {
      quantity: '',
    },
  });

  useEffect(() => {
    if (item) {
      setVisible(true);
      setValue('quantity', item.quantity_left.toString());
    } else {
      setVisible(false);
      setReason(null);
      reset();
    }
  }, [item]);

  // Actions:
  const confirmReduceQuantity = () => {
    // Validate data on the front:
    const newQuantity = parseFloat(
      getValues('quantity').replaceAll(',', '.'),
      10
    );
    if (Number.isNaN(newQuantity)) {
      displayToast('Please provide quantity.');
      return;
    }
    if (newQuantity > item.quantity_left) {
      displayToast(
        "You can't increase the quantity.\nPlease provide lower number."
      );
      return;
    }
    if (newQuantity === item.quantity_left) {
      setItem(null);
      return;
    }
    if (reason == null) {
      displayToast(
        'Please choose the reason of reducing quantity. It will be used in your statistics.'
      );
      return;
    }

    // Send request to API:
    editFridgeQuantityQuery({
      product: item.id,
      status: reason,
      quantity: item.quantity_left - newQuantity,
    })
      .unwrap()
      .then(() => {
        displayToast('Quantity reduced');
        setItem(null);
      })
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to reduce quantity'
        )
      );
  };
  const cancelReduceQuantity = () => setItem(null);

  return item ? (
    <Dialog
      title='Reduce quantity'
      visibilityState={[visible, setVisible]}
      label1='cancel'
      onPressLabel1={cancelReduceQuantity}
      label2='ok'
      onPressLabel2={confirmReduceQuantity}
    >
      <View
        style={{
          paddingHorizontal: 24,
        }}
      >
        <RadioButtonGroup
          items={['eaten', 'wasted', 'disappeared']}
          checkedState={[reason, setReason]}
        />
        <Separator />
        <InputField
          control={control}
          name='quantity'
          returnKeyType='done'
          variant='quantity'
          postfix={
            item.quantity_base
              ? ` / ${item.quantity_base} ${item.quantity_type}`
              : null
          }
          keyboardType='numeric'
          textAlign='right'
          paddings={false}
          onChangeText={convertToNumber}
          maxLength={6}
        />
      </View>
    </Dialog>
  ) : (
    <></>
  );
};

ReduceQuantity.propTypes = {
  item: PropTypes.object,
  setItem: PropTypes.func.isRequired,
};

export default ReduceQuantity;
