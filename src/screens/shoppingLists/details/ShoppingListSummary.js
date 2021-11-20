import React from 'react';

import { View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

import { Separator } from 'components';
import { PriceSummary, ShoppingListItem, Chip } from 'components/shoppingLists';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';

const ShoppingListSummary = () => {
  const styles = useStyles();

  // TODO: Remove this preprocessing after adding appropriate fetching data
  const usersNicks = Array.from(
    new Set(shoppingListItems.map((e) => e.userNick))
  );
  const usersURIs = Array.from(
    new Set(shoppingListItems.map((e) => e.avatarURI))
  );
  const users = new Set(
    usersNicks.map((_, idx) => ({
      name: usersNicks[idx],
      avatar: usersURIs[idx],
    }))
  );

  const productsNotBought = (username) => {
    const products = shoppingListItems.filter(
      (product) =>
        username === product.userNick &&
        (product.status === 'unchecked' || product.status === 'indeterminate')
    );

    return products.map(({ name, note, quantity, unit }, idx) => (
      <ShoppingListItem
        key={idx}
        text={name}
        subText={
          note ? `${quantity} ${unit}  •  ${note}` : `${quantity} ${unit}`
        }
        variant='checkbox'
        status='unchecked'
      />
    ));
  };

  const productsBought = (username) => {
    const products = shoppingListItems.filter(
      (product) => username === product.userNick && product.status === 'checked'
    );

    return products.map(
      ({ name, note, quantity, unit, status, price }, idx) => (
        <ShoppingListItem
          key={idx}
          text={name}
          subText={
            note ? `${quantity} ${unit}  •  ${note}` : `${quantity} ${unit}`
          }
          boxText={`${price} zł`}
          variant='checkbox'
          status={status}
        />
      )
    );
  };

  const sumList = (sum, val) => ({ price: sum.price + val.price });

  const sumUp = (username) => {
    const products = shoppingListItems.filter(
      (product) => username === product.userNick && product.status === 'checked'
    );

    const sum = products.reduce(sumList).price;

    // TODO: Use appropriate currency instead of hardcoded one
    return <PriceSummary value={sum} currency='zł' />;
  };

  // TODO: use FlatList?
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {Array.from(users).map((user, idx) => (
            <View key={idx}>
              <View style={{ paddingHorizontal: 16 }}>
                <Separator />
                <Chip avatarURI={user.avatar} text={user.name} />
                <Separator />
              </View>
              {productsNotBought(user.name)}
              {/* TODO: remove divider when no products above */}
              <Divider style={styles.divider} />
              {productsBought(user.name)}
              {sumUp(user.name)}
              <Divider style={styles.dividerWide} />
            </View>
          ))}
        </View>
      </ScrollView>
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
  dividerWide: {
    backgroundColor: theme.colors.silverMetallic,
    marginVertical: 16,
  },
}));

export default ShoppingListSummary;
