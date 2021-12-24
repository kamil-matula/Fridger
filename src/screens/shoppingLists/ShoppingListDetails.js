import React, { useState, useRef } from 'react';

import { View } from 'react-native';

import {
  FloatingActionButton,
  BottomSheet,
  SheetRow,
  Separator,
  ActivityIndicator,
  AppBarRenamer,
} from 'components';
import { makeStyles } from 'utils';
import { group, groupAdd, deleteIcon } from 'assets/icons';
import ShoppingListDetailsTabNavigator from 'navigation/ShoppingListDetailsTabNavigator';
import {
  useSpecificShoppingListQuery,
  useEditShoppingListNameMutation,
} from 'services/fridger/shoppingLists';
import { DeleteShoppingList } from 'dialogs';

const ShoppingListDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Queries:
  const { data: shoppingList, isLoading } = useSpecificShoppingListQuery(
    route.params.shoppingListID
  );
  const editShoppingListName = useEditShoppingListNameMutation()[0];

  // Visibility conditions:
  const [fabVisible, setFabVisible] = useState(true);
  const [deletingDialogVisible, setDeletingDialogVisible] = useState(false);
  const bottomSheet = useRef(null);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <AppBarRenamer
            label={shoppingList?.name}
            onPressIcon={() => bottomSheet.current.open()}
            query={editShoppingListName}
            confirmMessage='Shopping list renamed'
            errorMessage='Unable to rename shopping list'
            containerID={shoppingList?.id}
          />

          {/* Tabs */}
          <ShoppingListDetailsTabNavigator
            shoppingListID={route.params.shoppingListID}
            setFabVisible={setFabVisible}
          />

          {/* Space for bottom nav bar */}
          <Separator height={54} />

          {/* Adding new product */}
          <FloatingActionButton
            onPress={() => {
              navigation.navigate('AddShoppingListProduct', {
                shoppingListID: route.params.shoppingListID,
                mode: 'add',
              });
            }}
            visible={fabVisible}
            isBottomNavigationBar
          />

          {/* Shopping list actions */}
          <BottomSheet reference={bottomSheet}>
            <SheetRow
              icon={groupAdd}
              text='Share'
              onPress={() => {
                // Hide bottom sheet and change screen:
                bottomSheet.current.close();
                navigation.navigate('ShareShoppingList', {
                  containerID: shoppingList.id,
                  containerName: shoppingList.name,
                });
              }}
            />
            <SheetRow
              icon={group}
              text='Manage people'
              onPress={() => {
                // Hide bottom sheet and change screen:
                bottomSheet.current.close();
                navigation.navigate('EditPermissionsShoppingList', {
                  containerID: shoppingList.id,
                  containerName: shoppingList.name,
                });
              }}
            />
            <SheetRow
              icon={deleteIcon}
              text='Delete List'
              onPress={() => {
                // Show dialog and hide bottom sheet:
                bottomSheet.current.close();
                setDeletingDialogVisible(true);
              }}
            />
          </BottomSheet>

          {/* Deleting shopping list */}
          <DeleteShoppingList
            visible={deletingDialogVisible}
            setVisible={setDeletingDialogVisible}
            shoppingList={shoppingList}
            navigation={navigation}
          />
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

export default ShoppingListDetails;
