import React from 'react';

import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const UserDataRow = ({ label, data }) => {
  const styles = useStyles();

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.data}>{data || '-'}</Text>
    </>
  );
};

UserDataRow.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: theme.colors.silverMetallic,
  },
  data: {
    fontSize: 20,
    color: theme.colors.white,
  },
}));

export default UserDataRow;
