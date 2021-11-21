import React from 'react';

import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import { makeStyles } from 'utils';
import { shoppingListsList } from 'tmpData';
import { ShoppingListRow } from 'components/shoppingLists';

const ShoppingListsHistory = ({ navigation }) => {
  const styles = useStyles();
  const shoppingListsHistory = shoppingListsList.filter((e) => !e.isActive);

  // TODO: Use list of inactive shopping lists from redux
  return (
    <View style={styles.container}>
      {shoppingListsHistory.map(
        ({ id, name, uncheck, dips, check, isShared, isActive }) => (
          <View key={id}>
            <ShoppingListRow
              label={name}
              unchecked={uncheck}
              dips={dips}
              checked={check}
              isShared={isShared}
              isActive={isActive}
              onPress={() => {
                // Go to specific shopping list:
                navigation.navigate('ShoppingListDetails', {
                  shoppingListID: id,
                });
              }}
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

export default ShoppingListsHistory;
