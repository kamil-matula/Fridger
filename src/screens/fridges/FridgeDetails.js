import React, { useRef, useState } from 'react';

import { FlatList, View, Text, Image } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';
import { useForm } from 'react-hook-form';

import {
  AppBar,
  FloatingActionButton,
  FridgeDetailsRow,
  BottomSheet,
  SheetRow,
  Dialog,
  RadioButtonGroup,
  Separator,
  InputField,
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
  const { fridgeID, fridgeName } = route.params;

  // Sorting:
  // eslint-disable-next-line no-unused-vars
  const [sortingCategoryName, setSortingCategoryName] = useState('Name');
  // eslint-disable-next-line no-unused-vars
  const [sortingDirection, setSortingDirection] = useState('asc');

  // Deleting:
  const [deleteFridgeDialogVisible, setDeleteFridgeDialogVisible] =
    useState(false);
  const confirmRemoveFridge = () => {
    // TODO: Send request to API and wait for removing fridge from the list

    // Hide dialog and go back:
    setDeleteFridgeDialogVisible(false);
    navigation.pop();
  };
  const cancelRemoveFridge = () => {
    // Hide dialog:
    setDeleteFridgeDialogVisible(false);
  };

  // Reducing quantity - states:
  const [reduceQuantityVisible, setReduceQuantityVisible] = useState(false);
  const [reduceQuantityReason, setReduceQuantityReason] = useState(null);
  const [reduceQuantityItem, setReduceQuantityItem] = useState(null);
  const { control, reset, setValue, getValues } = useForm({
    defaultValues: {
      quantity: '',
    },
  });

  // Reducing quantity - dialog actions:
  const confirmReduceQuantity = () => {
    const newValue = getValues('quantity');
    // TODO: Validate the input on the frontend and display snackbar or error.
    // 1. Quantity should be lower than previous value.
    // 2. Reason shouldn't be null.

    // TODO: Send request to API and wait for reducing product's quantity
    console.log(
      `Quanity of product ${reduceQuantityItem.name} has been reduced due to: ${reduceQuantityReason}.` +
        `\nPrevious value: ${reduceQuantityItem.currentQuantity} ${reduceQuantityItem.quantityType}.` +
        `\nCurrent value: ${newValue} ${reduceQuantityItem.quantityType}.`
    );

    // Hide dialog and reset state:
    setReduceQuantityVisible(false);
    setReduceQuantityReason(null);
    setReduceQuantityItem(null);
    reset();
  };
  const cancelReduceQuantity = () => {
    // Hide dialog and reset state:
    setReduceQuantityVisible(false);
    setReduceQuantityReason(null);
    setReduceQuantityItem(null);
    reset();
  };
  const reduceQuantityOpen = (item) => {
    // Set item:
    setReduceQuantityItem(item);
    setValue('quantity', item.currentQuantity.toString());

    // Display dialog:
    setReduceQuantityVisible(true);
  };

  // Other actions:
  const refBS = useRef(null);

  return (
    <View style={styles.container}>
      <AppBar
        label={fridgeName}
        icon1={more}
        editable
        onPressIcon1={() => {
          // Open dialog with fridge actions:
          refBS.current.open();
        }}
        onSubmitEditing={(newName) => {
          // TODO: Send request to API to change fridge/list's name
          console.log(`Fridge ${fridgeName} has been renamed to ${newName}`);
        }}
      />
      <Divider style={styles.divider} />

      {/* Sorting products */}
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

      {/* List of products */}
      <FlatList
        style={styles.list}
        data={productsInFridgeList}
        renderItem={({ item }) => (
          <FridgeDetailsRow
            product={item}
            onPressIcon={() => reduceQuantityOpen(item)}
            onPressRow={() => {
              // Go to appropriate page:
              navigation.navigate('ProductDetails', {
                productID: item.id,
                fridgeID,
                fridgeName,
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Adding new product */}
      <FloatingActionButton
        onPress={() => {
          navigation.navigate('AddProductManual', { fridgeID: 1 });
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
            navigation.navigate('Share', { fridgeID });
          }}
        />
        <SheetRow
          icon={group}
          text='Manage people'
          onPress={() => {
            // Hide bottom sheet and change screen:
            refBS.current.close();
            navigation.navigate('EditPermissions', { fridgeID });
          }}
        />
        <SheetRow
          icon={deleteIcon}
          text='Delete fridge'
          onPress={() => {
            // Hide bottom sheet and show dialog responsible for deleting fridge:
            refBS.current.close();
            setDeleteFridgeDialogVisible(true);
          }}
        />
        <SheetRow icon={logout} text='Quit' onPress={() => {}} />
      </BottomSheet>

      {/* Deleting fridge */}
      <Dialog
        title='Delete fridge'
        paragraph={`Are you sure you want to delete fridge ${fridgeName}? This action cannot be undone.`}
        visibilityState={[
          deleteFridgeDialogVisible,
          setDeleteFridgeDialogVisible,
        ]}
        label1='delete'
        onPressLabel1={confirmRemoveFridge}
        label2='cancel'
        onPressLabel2={cancelRemoveFridge}
      />

      {/* Reducing quantity */}
      {reduceQuantityItem && (
        <Dialog
          title='Reduce quantity'
          visibilityState={[reduceQuantityVisible, setReduceQuantityVisible]}
          label1='cancel'
          onPressLabel1={cancelReduceQuantity}
          label2='ok'
          onPressLabel2={confirmReduceQuantity}
        >
          <View style={styles.reduceQuantityContent}>
            <RadioButtonGroup
              items={['eaten', 'wasted', 'disappeared']}
              checkedState={[reduceQuantityReason, setReduceQuantityReason]}
            />
            <Separator />
            <InputField
              control={control}
              name='quantity'
              returnKeyType='done'
              variant='quantity'
              postfix={
                reduceQuantityItem.maxQuantity
                  ? ` / ${reduceQuantityItem.maxQuantity} ${reduceQuantityItem.quantityType}`
                  : null
              }
              keyboardType='numeric'
              textAlign='right'
            />
          </View>
        </Dialog>
      )}
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
  reduceQuantityContent: {
    paddingHorizontal: 24,
  },
}));

export default FridgeDetails;
