/* eslint-disable arrow-body-style */
import React from 'react';

import { View } from 'react-native';

import {
  ScrollViewLayout,
  ShoppingListItem,
  Chip,
  Separator,
} from 'components';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';
import { Divider } from 'react-native-paper';

const ShoppingListSummary = () => {
  const styles = useStyles();

  const users = new Set(shoppingListItems.map((e) => e.userNick));

  return (
    <View style={styles.container}>
      <ScrollViewLayout addPadding={false}>
        <View>
          {Array.from(users).map((user) => {
            const productsNotBought = shoppingListItems.filter(
              (product) =>
                user === product.userNick && product.status === 'unchecked'
            );
            const prod = shoppingListItems.find(
              (product) => product.userNick === user
            );
            const productsBought = shoppingListItems.filter(
              (product) =>
                user === product.userNick && product.status === 'checked'
            );
            const productsIndeterminate = shoppingListItems.filter(
              (product) =>
                user === product.userNick && product.status === 'indeterminate'
            );
            chip = [
              <View style={{ paddingHorizontal: 16 }}>
                <Separator />
                <Chip avatarURI={prod.avatarURI} text={prod.userNick} />
                <Separator />
              </View>,
            ];
            p1 = productsNotBought.map(
              ({ text, subText, quantity, unit, status, price }) => (
                <ShoppingListItem
                  text={text}
                  subText={subText}
                  quantity={quantity}
                  unit={unit}
                  variant='checkbox'
                  status={status}
                  price={price}
                />
              )
            );
            p3 = productsIndeterminate.map(
              ({ text, subText, quantity, unit, status, price }) => (
                <ShoppingListItem
                  text={text}
                  subText={`${quantity} ${unit} • ${subText}`}
                  quantity={quantity}
                  unit={unit}
                  variant='checkbox'
                  status={status}
                  price={price}
                />
              )
            );
            sep1 = [<Divider style={styles.divider} />];
            sep2 = [<Divider style={styles.dividerBig} />];
            p2 = productsBought.map(
              ({ text, subText, quantity, unit, status, price }) => (
                <ShoppingListItem
                  text={text}
                  subText={subText}
                  quantity={quantity}
                  unit={unit}
                  variant='checkbox'
                  status={status}
                  price={price}
                />
              )
            );
            return chip.concat(p1, p3, sep1, p2, sep2);
          })}
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
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    margin: 16,
  },
  dividerBig: {
    backgroundColor: theme.colors.silverMetallic,
    marginVertical: 16,
  },
}));

export default ShoppingListSummary;
