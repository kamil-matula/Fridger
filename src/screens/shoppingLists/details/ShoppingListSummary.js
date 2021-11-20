import React from 'react';

import { View, FlatList } from 'react-native';
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
  const users = Array.from(
    new Set(
      usersNicks.map((_, idx) => ({
        name: usersNicks[idx],
        avatar: usersURIs[idx],
      }))
    )
  );

  // Function which returns list of components of not-bought products:
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

  // Function which returns list of components of bought products:
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
          // TODO: Use appropriate currency instead of hardcoded one
          boxText={`${price} zł`}
          variant='checkbox'
          status={status}
        />
      )
    );
  };

  // Function which returns component with total price:
  const sumUp = (username) => {
    // Choose matching ones:
    const products = shoppingListItems.filter(
      (product) => username === product.userNick && product.status === 'checked'
    );

    // Calculate price:
    let sum = 0;
    for (let i = 0; i < products.length; i += 1)
      sum += parseFloat(products[i].price);

    // TODO: Use appropriate currency instead of hardcoded one
    return <PriceSummary value={sum} currency='zł' />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          const notBoughtProds = productsNotBought(item.name);
          const boughtProds = productsBought(item.name);

          return (
            <View>
              {/* Sub-list owner */}
              <View style={{ paddingHorizontal: 16 }}>
                <Separator />
                <Chip avatarURI={item.avatar} text={item.name} />
                <Separator />
              </View>

              {/* Products */}
              {notBoughtProds}
              {notBoughtProds.length > 0 && boughtProds.length > 0 && (
                <Divider style={styles.divider} />
              )}
              {boughtProds}

              {/* Total price */}
              {sumUp(item.name)}
              <Divider style={styles.dividerWide} />
            </View>
          );
        }}
        keyExtractor={(item) => item.name.toString()}
      />
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
