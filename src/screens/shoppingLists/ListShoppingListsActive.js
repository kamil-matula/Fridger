import React from 'react';

import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import { makeStyles } from 'utils';
import { shoppingListsActive } from 'tmpData';
import { ShoppingListRow } from 'components';

const ListShoppingListsActive = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {shoppingListsActive.map(
        ({ id, title, uncheck, dips, check, isShared }) => (
          <View key={id}>
            <ShoppingListRow
              label={title}
              unchecked={uncheck}
              dips={dips}
              checked={check}
              isShared={isShared}
              onPress={() =>
                navigation.navigate('ShoppingListDetails', { isShared })
              }
            />
            <Divider style={styles.divider} />
          </View>
        )
      )}
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

export default ListShoppingListsActive;
