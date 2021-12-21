import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

const DatePicker = ({ setExpirationDate, visible, setVisible }) => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (_, selectedDate) => {
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

    // TODO: Fix it on iOS devices
  };

  const dateToString = (numDate) =>
    `${numDate.getDate()}.${numDate.getMonth()}.${numDate.getFullYear()}`;

  return visible ? (
    <DateTimePicker value={date} mode='date' onChange={onDateChange} />
  ) : (
    <></>
  );
};

DatePicker.propTypes = {
  setExpirationDate: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default DatePicker;
