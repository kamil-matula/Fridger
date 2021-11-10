import React from 'react';

import { View } from 'react-native';

import { AppBar } from 'components';
import { makeStyles } from 'utils';
import { deleteIcon, time } from 'assets/icons';

const ProductDetails = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar
        icon1={time}
        icon2={deleteIcon}
        onPressIcon1={() => {
          // TODO: Open dialog responsible for changing expiration date
        }}
        onPressIcon2={() => {
          // TODO: Open dialog responsible for deleting product
        }}
      />

      {/* Basic information */}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default ProductDetails;
