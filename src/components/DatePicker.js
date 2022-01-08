import React, { useState } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';

const DatePicker = ({ setExpirationDate, visible, setVisible }) => {
  const [date, setDate] = useState(new Date());

  const saveDate = (selectedDate) => {
    // Hide calendar:
    setVisible(false);

    // Retrieve date:
    if (selectedDate !== undefined) {
      setDate(selectedDate);
      setExpirationDate(dateToString(selectedDate));
    } else {
      setDate(new Date());
      setExpirationDate('');
    }
  };

  const dateToString = (numDate) =>
    `${setTrailingZero(numDate.getDate())}.${setTrailingZero(
      numDate.getMonth() + 1
    )}.${numDate.getFullYear()}`;
  const setTrailingZero = (number) =>
    number >= 10 ? number.toString() : `0${number}`;

  return (
    <DateTimePickerModal
      isVisible={visible}
      date={date}
      mode='date'
      onCancel={() => setVisible(false)}
      onConfirm={saveDate}
    />
  );
};

DatePicker.propTypes = {
  setExpirationDate: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default DatePicker;
