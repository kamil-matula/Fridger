import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { Separator, ShoppingListItem } from 'components';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';

const ShoppingList = ({ navigation }) => {
  const styles = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('edit');

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* List of clickable items */}
        {shoppingListItems.map(
          ({ avatarURI, name, note, quantity, unit, price, status }, idx) => (
            <TouchableRipple
              key={idx}
              onPress={() => {
                if (mode === 'edit') {
                  // TODO: pass values
                  navigation.navigate('AddShoppingListProduct');
                }
                if (mode === 'dips') {
                  // TODO: dips item
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
                boxText={status === 'checked' ? `${price} zł` : null}
              />
            </TouchableRipple>
          )
        )}

        {/* Space for a FAB */}
        <Separator height={64} />
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

export default ShoppingList;
