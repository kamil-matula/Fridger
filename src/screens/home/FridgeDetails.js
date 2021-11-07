import React, { useRef, useState } from 'react';

import { FlatList, View, Text, Image } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';

import {
  AppBar,
  FloatingActionButton,
  FridgeDetailsRow,
  BottomSheet,
  SheetRow,
  Dialog,
} from 'components';
import { makeStyles } from 'utils';
import {
  group,
  groupAdd,
  deleteIcon,
  logout,
  more,
  down,
  up,
} from 'assets/icons';
import { productsInFridgeList } from 'tmpData';

const FridgeDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Params from navigation
  // (TODO: Replace with more appropriate params):
  const { title } = route.params;

  // Sorting:
  // eslint-disable-next-line no-unused-vars
  const [sortingCategoryName, setSortingCategoryName] = useState('Name');
  // eslint-disable-next-line no-unused-vars
  const [sortingDirection, setSortingDirection] = useState('asc');

  // Deleting:
  const [dialogVisible, setDialogVisible] = useState(false);
  const removeFridge = () => {
    // TODO: Send request to API and wait for removing fridge from the list

    // Hide dialog and go back:
    setDialogVisible(false);
    navigation.pop();
  };
  const cancelRemoveFridge = () => {
    setDialogVisible(false);
  };

  // Other actions:
  const refBS = useRef(null);

  return (
    <View style={styles.container}>
      {/* Main content */}
      <AppBar
        label={title}
        icon1={more}
        editable
        onPressIcon1={() => {
          // Open dialog with fridge actions:
          refBS.current.open();
        }}
        onSubmitEditing={(newName) => {
          // TODO: Send request to API to change fridge/list's name
          console.log(`Fridge ${title} has been renamed to ${newName}`);
        }}
      />
      <Divider style={styles.divider} />
      <TouchableRipple
        onPress={() => {
          // TODO: Add displaying modal bottom sheet with sorting actions
        }}
      >
        <View style={styles.sortingLabel}>
          <Text style={styles.text}>{sortingCategoryName}</Text>
          <Image
            source={sortingDirection === 'asc' ? up : down}
            style={styles.icon}
          />
        </View>
      </TouchableRipple>
      <FlatList
        style={styles.list}
        data={productsInFridgeList}
        renderItem={({ item }) => <FridgeDetailsRow product={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <FloatingActionButton
        onPress={() => {
          // TODO: Add navigating to "ADD PRODUCT PAGE"
        }}
      />

      {/* Fridge actions */}
      <BottomSheet reference={refBS}>
        <SheetRow
          icon={groupAdd}
          text='Share'
          onPress={() => {
            // Hide bottom sheet and change screen:
            refBS.current.close();
            navigation.navigate('Share', { fridgeID: 1 });
          }}
        />
        <SheetRow
          icon={group}
          text='Manage people'
          onPress={() => {
            // Hide bottom sheet and change screen:
            refBS.current.close();
            navigation.navigate('EditPermissions', { fridgeID: 1 });
          }}
        />
        <SheetRow
          icon={deleteIcon}
          text='Delete fridge'
          onPress={() => {
            // Hide bottom sheet and show dialog responsible for deleting fridge:
            refBS.current.close();
            setDialogVisible(true);
          }}
        />
        <SheetRow icon={logout} text='Quit' onPress={() => {}} />
      </BottomSheet>

      {/* Deleting fridge */}
      <Dialog
        title='Delete fridge'
        paragraph={`Are you sure you want to delete fridge ${title}? This action cannot be undone.`}
        visibilityState={[dialogVisible, setDialogVisible]}
        label1='delete'
        onPressLabel1={removeFridge}
        label2='cancel'
        onPressLabel2={cancelRemoveFridge}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    width: '100%',
    height: 1,
  },
  list: {
    width: '100%',
  },
  sortingLabel: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
  },
  icon: { height: 16, width: 16, marginLeft: 10 },
}));

export default FridgeDetails;
