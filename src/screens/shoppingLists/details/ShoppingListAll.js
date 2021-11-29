import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { Separator } from 'components';
import { ShoppingListItem } from 'components/shoppingLists';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';

const ShoppingListAll = ({ navigation }) => {
  const styles = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('edit');

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* List of clickable items */}
        {shoppingListItems.map(
          (
            { id, avatarURI, name, note, quantity, unit, price, status },
            idx
          ) => (
            <TouchableRipple
              key={idx}
              onPress={() => {
                // Standard mode: Click to edit product
                if (mode === 'edit') {
                  navigation.navigate('AddShoppingListProduct', {
                    productID: id,
                  });
                }

                // Mode available only in shared lists: Click to reserve product
                if (mode === 'dips') {
                  // TODO: Add possibility to reserve a product.
                  // NOTE: The avatars should be replaced with custom checkboxes if this mode is on.
                }
              }}
            >
              <ShoppingListItem
                avatarURI={status !== 'unchecked' ? avatarURI : null}
                text={name}
                subText={
                  note
                    ? `${quantity} ${unit}  •  ${note}`
                    : `${quantity} ${unit}`
                }
                // TODO: Use appropriate currency instead of hardcoded one
                boxText={status === 'checked' ? `${price} zł` : null}
              />
            </TouchableRipple>
          )
        )}

        {/* Space for FAB */}
        <Separator height={80} />
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default ShoppingListAll;
