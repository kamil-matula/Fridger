import React, { useState, useRef } from 'react';

import { View } from 'react-native';

import {
  AppBar,
  FloatingActionButton,
  BottomSheet,
  SheetRow,
  Dialog,
  Separator,
} from 'components';
import { makeStyles } from 'utils';
import { more, group, groupAdd, hand, deleteIcon } from 'assets/icons';
import { fridgeTab } from 'assets/icons/navigation';
import { fridgesList, shoppingListsList } from 'tmpData';
import ShoppingListDetailsTabNavigator from 'navigation/ShoppingListDetailsTabNavigator';

const ShoppingListDetails = ({ route, navigation }) => {
  // Shopping list identifying
  // (TODO: Add error-handling for cases when route.params.shoppingListID doesn't exist):
  const shoppingList = shoppingListsList.find(
    (e) => e.id === route.params.shoppingListID
  );

  // Active fridge identifying:
  const activeFridge = shoppingList.activeFridgeID
    ? fridgesList.find((e) => e.id === shoppingList.activeFridgeID)
    : null;

  // FAB & Tabs conditions:
  const { isShared } = shoppingList;
  const [fabVisible, setFabVisible] = useState(true);

  // Deleting:
  const [deleteShoppingListDialogVisible, setDeleteShoppingListDialogVisible] =
    useState(false);
  const confirmRemoveShoppingList = () => {
    // TODO: Send request to API and wait for removing shopping list from the list

    // Hide dialog and go back:
    setDeleteShoppingListDialogVisible(false);
    navigation.pop();
  };
  const cancelRemoveShoppingList = () => {
    // Hide dialog:
    setDeleteShoppingListDialogVisible(false);
  };

  // Shopping List Actions:
  const bottomSheet = useRef(null);

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar
        label={shoppingList.name}
        icon1={more}
        onPressIcon1={() => {
          bottomSheet.current.open();
        }}
        editable
        onSubmitEditing={(newName) => {
          // TODO: Send request to API to change list's name
          console.log(
            `Shopping List ${shoppingList.name} has been renamed to ${newName}`
          );
        }}
      />

      {/* Tabs */}
      <ShoppingListDetailsTabNavigator
        isShared={isShared}
        setFabVisible={setFabVisible}
      />

      {/* Space for bottom nav bar */}
      <Separator height={54} />

      {/* Adding new product */}
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddShoppingListProduct');
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
            navigation.navigate('Share', {
              type: 'shoppingList',
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
            navigation.navigate('EditPermissions', {
              type: 'shoppingList',
              containerID: shoppingList.id,
              containerName: shoppingList.name,
            });
          }}
        />
        <SheetRow
          icon={hand}
          text='Dibs'
          onPress={() => {
            // TODO: Add dibs feature
          }}
        />
        <SheetRow
          icon={fridgeTab}
          text='Change fridge'
          subText={activeFridge ? `   •   ${activeFridge.name}` : null}
          onPress={() => {
            // Hide bottom sheet and change screen:
            bottomSheet.current.close();
            navigation.navigate('ChooseFridge', {
              activeFridgeName: activeFridge ? activeFridge.name : null,
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
