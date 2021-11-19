/* eslint-disable arrow-body-style */
import React from 'react';

import { View, ScrollView } from 'react-native';

import { ShoppingListItem, Chip, Separator, PriceSummary } from 'components';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';
import { Divider } from 'react-native-paper';

const ShoppingListSummary = () => {
  const styles = useStyles();

  // TODO: I will get different data and this preprocessing won't be necessary
  const users = new Set(
    shoppingListItems.map((e) => ({ name: e.userNick, avatar: e.avatarURI }))
  );

  const productsNotBought = (username) => {
    const products = shoppingListItems.filter(
      (product) =>
        username === product.userNick && product.status === 'unchecked'
    );

    return products.map(({ text, subText, quantity, unit, status }, idx) => (
      <ShoppingListItem
        key={idx}
        text={text}
        subText={subText}
        boxText={`${quantity} ${unit}`}
        variant='checkbox'
        status={status}
      />
    ));
  };

  const productsIndeterminate = (username) => {
    const products = shoppingListItems.filter(
      (product) =>
        username === product.userNick && product.status === 'indeterminate'
    );

    return products.map(
      ({ text, subText, quantity, unit, status, price }, idx) => (
        <ShoppingListItem
          key={idx}
          text={text}
          subText={`${quantity} ${unit} • ${subText}`}
          boxText={`${price} zł`}
          variant='checkbox'
          status={status}
        />
      )
    );
  };

  const productsBought = (username) => {
    const products = shoppingListItems.filter(
      (product) => username === product.userNick && product.status === 'checked'
    );

    return products.map(
      ({ text, subText, quantity, unit, status, price }, idx) => (
        <ShoppingListItem
          key={idx}
          text={text}
          subText={`${quantity} ${unit} • ${subText}`}
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

    return <PriceSummary value={sum} editable={false} />;
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
              {productsIndeterminate(user.name)}
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
