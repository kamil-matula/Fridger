import React from 'react';

import { View, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { LoadingOverlay, Separator } from 'components';
import { ShoppingListItem } from 'components/shoppingLists';
import {
  unitFromBackToFront,
  quantityFromBackToFront,
} from 'utils/dataConverting';
import { displayToast, makeStyles } from 'utils';

import {
  useShoppingListAllProductsQuery,
  useEditShoppingListProductMutation,
} from 'services/fridger/shoppingListProducts';
import { useUserInfoQuery } from 'services/fridger/user';

const ShoppingListAll = ({ route, navigation }) => {
  const styles = useStyles();

  const shoppingListProducts = useShoppingListAllProductsQuery({
    id: route.params.shoppingListID,
  });
  const editShoppingListProductQuery = useEditShoppingListProductMutation()[0];
  const user = useUserInfoQuery();

  const dips = ({ id, status }) => {
    editShoppingListProductQuery({
      productId: id,
      status: status === 'FREE' ? 'TAKER' : 'FREE',
    });
  };

  return (
    <View style={styles.container}>
      {shoppingListProducts.isLoading || user.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          {shoppingListProducts.data.map((product) => (
            <TouchableRipple
              key={product.id}
              onPress={() => {
                if (product.created_by.username === user.data.username) {
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
              <ShoppingListItem
                avatarURI={
                  product.status !== 'FREE' ? product.created_by.avatar : null
                }
                text={product.name}
                subText={
                  product.note
                    ? `${quantityFromBackToFront(
                        product.quantity
                      )} ${unitFromBackToFront(product.quantity_type)}  •  ${
                        product.note
                      }`
                    : `${quantityFromBackToFront(
                        product.quantity
                      )} ${unitFromBackToFront(product.quantity_type)}`
                }
                onPressIcon={() => dips(product)}
                showHand={
                  product.status === 'FREE' ||
                  product.created_by.username === user.data.username
                }
              />
            </TouchableRipple>
          ))}

          {/* Space for FAB */}
          <Separator height={80} />
        </ScrollView>
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
