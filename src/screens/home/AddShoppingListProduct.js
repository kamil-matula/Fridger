import React from 'react';

import { View } from 'react-native';

import { ScrollViewLayout, AppBar } from 'components';
import { makeStyles } from 'utils';
import { deleteIcon } from '../../../assets/icons';

const AddShoppingListProduct = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar
        label='Add product'
        icon1={deleteIcon}
        onPressIcon1={
          () => {}
          // TODO: remove product
        }
      />
      <ScrollViewLayout addPadding={false} />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default AddShoppingListProduct;
