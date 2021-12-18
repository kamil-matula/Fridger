import React from 'react';

import { View, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { LoadingOverlay, Separator } from 'components';
import { ShoppingListItem } from 'components/shoppingLists';
import {
  unitFromBackToFront,
  quantityFromBackToFront,
} from 'utils/dataConverting';
import { makeStyles } from 'utils';

import {
  useShoppingListAllProductsQuery,
  // useEditShoppingListProductMutation,
} from 'services/fridger/shoppingListProducts';

const ShoppingListAll = ({ route, navigation }) => {
  const styles = useStyles();

  const shoppingListProducts = useShoppingListAllProductsQuery({
    id: route.params.shoppingListID,
  });

  return (
    <View style={styles.container}>
      {shoppingListProducts.isLoading ? (
        <LoadingOverlay />
      ) : (
        <ScrollView>
          {shoppingListProducts.data.map((product) => (
            <TouchableRipple
              key={product.id}
              onPress={() => {
                navigation.navigate('AddShoppingListProduct', {
                  shoppingListID: route.params.shoppingListID,
                  product,
                  mode: 'edit',
                });
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
                // boxText={`PLN`}
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
