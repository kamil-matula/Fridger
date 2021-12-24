import React from 'react';

import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setPrice, setStatus } from 'services/ShoppingListYourProductsSlice';

import {
  Button,
  ActivityIndicator,
  ScrollViewLayout,
  Separator,
} from 'components';
import {
  PriceSummary,
  ShoppingListItemInteractive,
} from 'components/shoppingLists';
import { makeStyles, displayToast } from 'utils';

import {
  useShoppingListYourProductsQuery,
  useBuyProductsMutation,
} from 'services/fridger/shoppingListProducts';

const ShoppingListYour = ({ route }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const yourProducts = useShoppingListYourProductsQuery({
    id: route.params.shoppingListID,
  });
  const buyProducts = useBuyProductsMutation()[0];

  const shoppingList = useSelector(
    (state) => state.shoppingListYourProducts.value[route.params.shoppingListID]
  );

  // Calculating total price:
  const sumList = (list) => {
    let sum = 0;
    for (let i = 0; i < list.length; i += 1)
      sum += parseFloat(list[i].price || 0);
    return sum;
  };

  // Lists with matching states + total price:
  const unchecked = shoppingList?.products.filter(
    (e) => e.status === 'unchecked'
  );
  const indeterminate =
    shoppingList?.products.filter((e) => e.status === 'indeterminate') || [];
  const sum = sumList(indeterminate);

  const changeStatus = (item) => {
    let newStatus;
    if (item.status === 'unchecked') {
      newStatus = 'indeterminate';
    } else if (item.status === 'indeterminate') {
      newStatus = 'unchecked';
    }
    dispatch(
      setStatus({
        shoppingListId: route.params.shoppingListID,
        productId: item.id,
        status: newStatus,
      })
    );
  };

  const changePrice = (id, newPrice) => {
    dispatch(
      setPrice({
        shoppingListId: route.params.shoppingListID,
        productId: id,
        price: newPrice,
      })
    );
  };

  const submit = () => {
    buyProducts({
      shoppingList: route.params.shoppingListID,
      products: indeterminate.map((product) => ({
        id: product.id,
        price: product.price,
      })),
    })
      .unwrap()
      .then(() => {
        displayToast('Products bought');
      })
      .catch((error) => {
        displayToast(error.data?.non_field_errors || 'Unable to buy products');
      });
  };

  return (
    <View style={styles.container}>
      {yourProducts.isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollViewLayout addPadding={false}>
          <View>
            {/* List of products that can be placed in basket */}
            {unchecked?.map((item) => (
              <ShoppingListItemInteractive
                key={item.id}
                text={item.name}
                subText={
                  item.note
                    ? `${item.quantity} ${item.quantity_type}  •  ${item.note}`
                    : `${item.quantity} ${item.quantity_type}`
                }
                status={item.status}
                onChangeStatus={() => {
                  changeStatus(item);
                }}
                currency='PLN'
              />
            ))}

            {unchecked?.length > 0 && indeterminate?.length > 0 && (
              <Divider style={styles.divider} />
            )}

            {/* List of products that are in basket */}
            {indeterminate?.map((item) => (
              <ShoppingListItemInteractive
                key={item.id}
                text={item.name}
                subText={
                  item.note
                    ? `${item.quantity} ${item.quantity_type}  •  ${item.note}`
                    : `${item.quantity} ${item.quantity_type}`
                }
                status={item.status}
                price={item.price}
                onChangeStatus={() => {
                  changeStatus(item);
                }}
                onChangePrice={(newPrice) => changePrice(item.id, newPrice)}
                currency='PLN'
              />
            ))}

            {/* Rendering sum of prices and button only 
              if there are products in the basket */}
            {indeterminate.length > 0 && (
              <>
                <Separator />
                <PriceSummary value={sum} currency='PLN' />

                <Separator height={32} />

                <View style={{ alignItems: 'center' }}>
                  <Button
                    label='confirm'
                    variant='contained'
                    onPress={submit}
                  />
                </View>
                <Separator height={16} />
              </>
            )}
          </View>
        </ScrollViewLayout>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    margin: 16,
  },
  reset: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
}));

export default ShoppingListYour;
