import React from 'react';

import { View, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { ActivityIndicator, Placeholder, Separator } from 'components';
import { ShoppingListItemAll } from 'components/shoppingLists';
import { displayToast, makeStyles } from 'utils';

import {
  useShoppingListAllProductsQuery,
  useEditShoppingListProductMutation,
} from 'services/fridger/shoppingListProducts';
import { useUserInfoQuery } from 'services/fridger/user';

const ShoppingListAll = ({ route, navigation }) => {
  const styles = useStyles();

  const shoppingListProductsQuery = useShoppingListAllProductsQuery(
    {
      id: route.params.shoppingListID,
    },
    { pollingInterval: 5000 }
  );
  const editShoppingListProductQuery = useEditShoppingListProductMutation()[0];
  const userInfoQuery = useUserInfoQuery();

  const dips = (product) => {
    editShoppingListProductQuery({
      productId: product.id,
      status: product.status === 'free' ? 'unchecked' : 'free',
    })
      .unwrap()
      .catch((error) => {
        const otherError = error.data?.detail;
        const statusError = error.data?.status;
        const nonFieldErrors = error.data?.non_field_errors;

        if (otherError) {
          displayToast(otherError);
        } else if (statusError) {
          displayToast(statusError);
        } else if (nonFieldErrors) {
          displayToast(nonFieldErrors);
        }
      });
  };

  return (
    <View style={styles.container}>
      {shoppingListProductsQuery.isLoading || userInfoQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {shoppingListProductsQuery?.data.length > 0 ? (
            <ScrollView>
              {shoppingListProductsQuery?.data.map((product) => (
                <TouchableRipple
                  key={product.id}
                  onPress={() => {
                    if (
                      product.status === 'free' ||
                      product.taken_by?.username === userInfoQuery.data.username
                    ) {
                      navigation.navigate('AddShoppingListProduct', {
                        shoppingListID: route.params.shoppingListID,
                        product,
                        mode: 'edit',
                      });
                    } else {
                      displayToast('Can not edit. Product is taken');
                    }
                  }}
                >
                  <ShoppingListItemAll
                    avatarURI={product.taken_by?.avatar}
                    text={product.name}
                    subText={
                      product.note
                        ? `${product.quantity} ${product.quantity_type}  •  ${product.note}`
                        : `${product.quantity} ${product.quantity_type}`
                    }
                    onPressIcon={() => dips(product)}
                    showHand={
                      product.status === 'free' ||
                      (product.status === 'unchecked' &&
                        product.taken_by?.username ===
                          userInfoQuery.data.username)
                    }
                    isFilled={product.status === 'unchecked'}
                    productStatus={product.status}
                  />
                </TouchableRipple>
              ))}

              {/* Space for FAB and nav bar */}
              <Separator height={54 + 88} />
            </ScrollView>
          ) : (
            <>
              <Placeholder content='No products to display' />
              {/* Space for nav bar */}
              <Separator height={54} />
            </>
          )}
        </>
      )}
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
