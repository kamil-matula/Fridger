import React, { useState, useRef } from 'react';

import { View } from 'react-native';

import {
  FloatingActionButton,
  BottomSheet,
  SheetRow,
  Dialog,
  Separator,
  LoadingOverlay,
  AppBarRenamer,
} from 'components';
import { displayToast, makeStyles } from 'utils';
import { group, groupAdd, deleteIcon } from 'assets/icons';
import ShoppingListDetailsTabNavigator from 'navigation/ShoppingListDetailsTabNavigator';

import {
  useSpecificShoppingListQuery,
  useDeleteShoppingListMutation,
  useEditShoppingListNameMutation,
} from 'services/fridger/shoppingLists';

const ShoppingListDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Shopping list identifying
  const { data: shoppingList, isLoading } = useSpecificShoppingListQuery(
    route.params.shoppingListID
  );
  const deleteShoppingList = useDeleteShoppingListMutation()[0];
  const editShoppingListName = useEditShoppingListNameMutation()[0];

  // FAB & Tabs conditions:
  const [fabVisible, setFabVisible] = useState(true);

  // Deleting:
  const [deleteShoppingListDialogVisible, setDeleteShoppingListDialogVisible] =
    useState(false);
  const confirmRemoveShoppingList = () => {
    deleteShoppingList(route.params.shoppingListID)
      .unwrap()
      .then(() => {
        displayToast('Shopping list deleted');
        setDeleteFridgeDialogVisible(false);
        navigation.pop();
      })
      .catch(() => displayToast('Unable to delete shopping list'));
  };
  const cancelRemoveShoppingList = () =>
    setDeleteShoppingListDialogVisible(false);

  // Shopping List Actions:
  const bottomSheet = useRef(null);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingOverlay />
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
            isShared={shoppingList.is_shared}
            setFabVisible={setFabVisible}
          />

          {/* Space for bottom nav bar */}
          <Separator height={54} />

          {/* Adding new product */}
          <FloatingActionButton
            onPress={() => navigation.navigate('AddShoppingListProduct')}
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
                setDeleteShoppingListDialogVisible(true);
              }}
            />
          </BottomSheet>

          {/* Deleting shopping list */}
          <Dialog
            title='Delete shopping list'
            paragraph={`Are you sure you want to delete shopping list ${shoppingList.name}? This action cannot be undone.`}
            visibilityState={[
              deleteShoppingListDialogVisible,
              setDeleteShoppingListDialogVisible,
            ]}
            label1='delete'
            onPressLabel1={confirmRemoveShoppingList}
            label2='cancel'
            onPressLabel2={cancelRemoveShoppingList}
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
