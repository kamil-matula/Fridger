import React, { useRef } from 'react';

import { Text, View } from 'react-native';

import { AppBar, BottomSheet, SheetRow } from 'components';
import { makeStyles } from 'utils';
import { group, groupAdd, more, hand, deleteIcon } from 'assets/icons';
import { fridgeTab } from 'assets/icons/navigation';
import { fridgesList } from 'tmpData';

const ShoppingListDetails = ({ navigation }) => {
  // TODO: Change it to useState (or something else) after adding Redux, because
  // currently we are not able to pass [activeFridge, setActiveFridge]
  // in route params and the docs suggest using useContext to have this
  // variable both in AddShoppingList and ChooseFridge pages.
  const activeFridge = fridgesList[0]; // alternative: const activeFridge = null;

  // Shopping List Actions:
  const refActions = useRef(null);

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar
        label='Shopping List Details'
        icon1={more}
        onPressIcon1={() => {
          // Open modal bottom sheet with shopping list actions:
          refActions.current.open();
        }}
      />
      <View style={styles.container2}>
        <Text style={styles.text}>Shopping List Details</Text>
      </View>

      {/* Shopping list actions */}
      <BottomSheet reference={refActions}>
        <SheetRow
          icon={groupAdd}
          text='Share'
          onPress={() => {
            // Hide bottom sheet and change screen:
            refActions.current.close();
            navigation.navigate('Share', {
              // TODO: Add passing data from Shopping Lists page
              type: 'shoppingList',
              containerID: 1,
            });
          }}
        />
        <SheetRow
          icon={group}
          text='Manage people'
          onPress={() => {
            // Hide bottom sheet and change screen:
            refActions.current.close();
            navigation.navigate('EditPermissions', {
              // TODO: Add passing data from Shopping Lists page
              type: 'shoppingList',
              containerID: 1,
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
            refActions.current.close();
            navigation.navigate('ChooseFridge', {
              activeFridgeName: activeFridge ? activeFridge.name : null,
            });
          }}
        />
        <SheetRow
          icon={deleteIcon}
          text='Delete List'
          onPress={() => {
            // TODO: Add deleting shopping list
          }}
        />
      </BottomSheet>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: theme.colors.white,
  },
}));

export default ShoppingListDetails;
