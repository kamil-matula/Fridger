import React, { useState, useRef } from 'react';

import { View } from 'react-native';

import {
  AppBar,
  FloatingActionButton,
  BottomSheet,
  SheetRow,
  Dialog,
  Separator,
  LoadingOverlay,
} from 'components';
import { displayToast, makeStyles } from 'utils';
import { more, group, groupAdd, deleteIcon } from 'assets/icons';
import ShoppingListDetailsTabNavigator from 'navigation/ShoppingListDetailsTabNavigator';

import {
  useSpecificShoppingListQuery,
  useDeleteShoppingListMutation,
  useEditShoppingListNameMutation,
} from 'services/fridger/shoppingLists';

const ShoppingListDetails = ({ route, navigation }) => {
  // Shopping list identifying
  const shoppingList = useSpecificShoppingListQuery(
    route.params.shoppingListID
  );
  const deleteShoppingList = useDeleteShoppingListMutation()[0];
  const editShoppingListName = useEditShoppingListNameMutation()[0];

  // FAB & Tabs conditions:
  const [fabVisible, setFabVisible] = useState(true);

  // Rename shopping list
  const renameShoppingList = (newName) => {
    editShoppingListName({
      id: route.params.shoppingListID,
      name: newName,
    })
      .unwrap()
      .then(() => displayToast('Shopping list renamed'))
      .catch((error) => {
        if (error.data?.name) displayToast('Invalid name');
        else
          displayToast(
            error.data?.non_field_errors || 'Unable to rename shopping list'
          );

        // TODO: Reset appbar's value
      });
  };

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

  const styles = useStyles();

  return (
    <View style={styles.container}>
      {shoppingList.isLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          <AppBar
            label={shoppingList.data.name}
            icon1={more}
            onPressIcon1={() => bottomSheet.current.open()}
            onSubmitEditing={renameShoppingList}
            editable
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
                  containerID: shoppingList.data.id,
                  containerName: shoppingList.data.name,
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
                  containerID: shoppingList.data.id,
                  containerName: shoppingList.data.name,
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
            paragraph={`Are you sure you want to delete shopping list ${shoppingList.data.name}? This action cannot be undone.`}
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
