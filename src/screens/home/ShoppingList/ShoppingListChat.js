/* eslint-disable arrow-body-style */
import React from 'react';

import { View } from 'react-native';

import { ScrollViewLayout, ShoppingListItem } from 'components';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';

import { TouchableRipple } from 'react-native-paper';

const ShoppingListChat = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <ScrollViewLayout addPadding={false}>
        <View>
          {shoppingListItems.map(
            ({ avatarURI, text, subText, quantity, unit }, idx) => (
              <TouchableRipple
                key={idx}
                onPress={() => {
                  if (mode === 'edit') {
                    // TODO: go to edit item
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
                  quantity={quantity}
                  unit={unit}
                />
              </TouchableRipple>
            )
          )}
        </View>
      </ScrollViewLayout>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default ShoppingListChat;
