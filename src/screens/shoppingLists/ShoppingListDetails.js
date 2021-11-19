import React, { useState, useRef } from 'react';

import { View } from 'react-native';

import {
  AppBar,
  FloatingActionButton,
  BottomSheet,
  SheetRow,
} from 'components';
import { makeStyles } from 'utils';
import { scanner, more, group, groupAdd, hand, deleteIcon } from 'assets/icons';
import { fridgeTab } from 'assets/icons/navigation';
import { fridgesList } from 'tmpData';
import ShoppingListDetailsTabNavigator from 'navigation/ShoppingListDetailsTabNavigator';

const ShoppingListDetails = ({ navigation }) => {
  const styles = useStyles();

  const isShared = false;
  const [fabVisible, setFabVisible] = useState(true);

  const activeFridge = fridgesList[0];
  const bottomSheet = useRef(null);

  return (
    <View style={styles.container}>
      <AppBar
        label='Shopping Lists'
        icon1={scanner}
        icon2={more}
        onPressIcon1={() => {
          navigation.navigate('ShoppingListScanner');
        }}
        onPressIcon2={() => {
          bottomSheet.current.open();
        }}
      />

      {/* Tabs */}
      <ShoppingListDetailsTabNavigator
        isShared={isShared}
        setFabVisible={setFabVisible}
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
            bottomSheet.current.close();
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
            // TODO: Add deleting shopping list
          }}
        />
      </BottomSheet>
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddShoppingListProduct');
        }}
        visible={fabVisible}
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
