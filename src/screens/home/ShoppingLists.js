import React from 'react';

import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import { makeStyles } from 'utils';
import { shoppingLists } from 'tmpData';
import { ShoppingListRow } from 'components';

const ShoppingLists = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {shoppingLists.map(({ id, title, uncheck, dips, check }) => (
        <View key={id}>
          <ShoppingListRow
            label={title}
            unchecked={uncheck}
            dips={dips}
            checked={check}
            onPress={() => navigation.navigate('ShoppingListDetails')}
          />
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.white,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
  },
}));

export default ShoppingLists;
