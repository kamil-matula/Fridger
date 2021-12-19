import React, { useState } from 'react';

import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { Dialog, InputField, DatePicker } from 'components';
import { displayToast } from 'utils';
import { calendar } from 'assets/icons';
import { useEditFridgeProductMutation } from 'services/fridger/fridgeProducts';

const ChangeExpirationDate = ({
  visible,
  setVisible,
  productID,
  expiration,
}) => {
  // Form states:
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      expiration,
    },
  });
  const rules = {
    expiration: {
      pattern: {
        value: /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.\d{4}$/,
        message: 'Invalid date format',
      },
    },
  };

  // Queries:
  const [editProductQuery] = useEditFridgeProductMutation();

  // Calendar visibility:
  const [datepickerVisible, setDatepickerVisible] = useState(false);

  // Actions:
  const confirmChangeExpDate = (data) => changeExpDate(data);
  const cancelChangeExpDate = () => {
    setVisible(false);
    reset();
  };
  const changeExpDate = (data) => {
    editProductQuery({
      id: productID,
      expiration: data.expiration,
    })
      .unwrap()
      .then(() => {
        displayToast('Expiration date changed');
        setVisible(false);
      })
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to change expiration date'
        )
      );
  };

  return (
    <>
      <Dialog
        title='Set expiration date'
        visibilityState={[visible, setVisible]}
        label1='cancel'
        onPressLabel1={cancelChangeExpDate}
        label2='ok'
        onPressLabel2={handleSubmit(confirmChangeExpDate)}
        titlePaddingBottom={0}
      >
        <View style={{ paddingHorizontal: 16, height: 70 }}>
          <InputField
            control={control}
            rules={rules.expiration}
            name='expiration'
            variant='data'
            icon={calendar}
            onIconPress={() => setDatepickerVisible(true)}
            placeholder='dd.MM.rrrr'
            returnKeyType='done'
            keyboardType='numeric'
          />
        </View>
      </Dialog>

      <DatePicker
        setExpirationDate={(value) => setValue('expiration', value)}
        visible={datepickerVisible}
        setVisible={setDatepickerVisible}
      />
    </>
  );
};

ChangeExpirationDate.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  productID: PropTypes.string,
  expiration: PropTypes.string,
};

export default ChangeExpirationDate;
