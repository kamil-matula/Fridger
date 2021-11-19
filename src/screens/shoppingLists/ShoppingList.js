import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { ShoppingListItem } from 'components';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';

import { TouchableRipple } from 'react-native-paper';

const ShoppingList = ({ navigation }) => {
  const styles = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('edit');

  return (
    <View style={styles.container}>
      <ScrollView>
        {shoppingListItems.map(
          ({ avatarURI, text, subText, quantity, unit }, idx) => (
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
                avatarURI={avatarURI}
                text={text}
                subText={subText}
                boxText={`${quantity} ${unit}`}
              />
            </TouchableRipple>
          )
        )}
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
