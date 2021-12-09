import React, { useRef, useState, useEffect } from 'react';

import { FlatList, View, Text, Image } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';
import { useForm } from 'react-hook-form';

import {
  AppBar,
  FloatingActionButton,
  BottomSheet,
  SheetRow,
  Dialog,
  RadioButtonGroup,
  Separator,
  InputField,
  LoadingOverlay,
} from 'components';
import { FridgeDetailsRow } from 'components/fridges';
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
import {
  useEditFridgeNameMutation,
  useOneFridgeQuery,
} from 'services/fridger/fridges';

const FridgeDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Fridge identifying:
  const fridgeID = route.params ? route.params.fridgeID : null;

  // Queries:
  const { data, isLoading } = useOneFridgeQuery(fridgeID);
  const [editFridgeNameQuery] = useEditFridgeNameMutation();

  // Data:
  const [fridge, setFridge] = useState(null);

  // Update fridge when data is fetched:
  useEffect(() => {
    if (data) {
      setFridge({
        id: data.id,
        name: data.name,
        items: data.products_count,
        people: data.shared_with_count,
      });
    }
  }, [data]);

  // Send data to api:
  const editFridgeName = ({ id, name }) => {
    editFridgeNameQuery({ id, name })
      .unwrap()
      .then((response) => {
        // TODO: Add displaying toast here?
        console.log(response);
      })
      .catch((error) => {
        // TODO: Add error-handling after making sure what kind of errors can be here
        console.log(error);
      });
  };

  // Sorting:
  const [sortingCategoryName, setSortingCategoryName] = useState('Name');
  const [sortingDirection, setSortingDirection] = useState('asc');
  const refSorting = useRef(null);
  const onSortPress = (category) => {
    // TODO: Send request to API and refresh products
    console.log(`Sorting products by ${category}`);

    // Hide bottom sheet and set new sorting:
    if (sortingCategoryName === category)
      setSortingDirection((it) => (it === 'asc' ? 'desc' : 'asc'));
    else setSortingCategoryName(category);
    refSorting.current.close();
  };
  const displaySortIcon = (category) => {
    if (sortingCategoryName === category)
      return sortingDirection === 'asc' ? up : down;
    return null;
  };

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
  const refFridgeActions = useRef(null);

  return (
    <View style={styles.container}>
      <AppBar
        label={fridge?.name ?? ''}
        icon1={more}
        editable
        onPressIcon1={() => {
          // Open bottom sheet with fridge actions:
          refFridgeActions.current.open();
        }}
        onSubmitEditing={(newName) => {
          if (fridge != null) {
            editFridgeName({ id: fridge.id, name: newName });
          }
        }}
      />
      <Divider />

      {/* Sorting products */}
      <TouchableRipple
        onPress={() => {
          // Open bottom sheet with sorting actions:
          refSorting.current.open();
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
      {/* TODO: Use products from API instead of mocked data */}
      <FlatList
        data={productsInFridgeList}
        renderItem={({ item }) => (
          <FridgeDetailsRow
            product={item}
            onPressIcon={() => reduceQuantityOpen(item)}
            onPressRow={() => {
              // Go to appropriate page:
              if (fridge != null)
                navigation.navigate('ProductDetails', {
                  productID: item.id,
                  fridgeID: fridge.id,
                  fridgeName: fridge.name,
                });
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Space for bottom nav bar */}
      <Separator height={54} />

      {/* Adding new product */}
      <FloatingActionButton
        onPress={() => {
          if (fridge != null)
            navigation.navigate('AddProductManual', { fridgeID: fridge.id });
        }}
        isBottomNavigationBar
      />

      {/* Fridge actions */}
      <BottomSheet reference={refFridgeActions}>
        <SheetRow
          icon={groupAdd}
          text='Share'
          onPress={() => {
            // Hide bottom sheet and change screen:
            refFridgeActions.current.close();
            if (fridge != null)
              navigation.navigate('Share', {
                type: 'fridge',
                containerID: fridge.id,
              });
          }}
        />
        <SheetRow
          icon={group}
          text='Manage people'
          onPress={() => {
            // Hide bottom sheet and change screen:
            refFridgeActions.current.close();
            if (fridge != null)
              navigation.navigate('EditPermissions', {
                type: 'fridge',
                containerID: fridge.id,
              });
          }}
        />
        <SheetRow
          icon={deleteIcon}
          text='Delete fridge'
          onPress={() => {
            // Hide bottom sheet and show dialog responsible for deleting fridge:
            refFridgeActions.current.close();
            setDeleteFridgeDialogVisible(true);
          }}
        />
        <SheetRow
          icon={logout}
          text='Quit'
          onPress={() => {
            // TODO: Send request to API to lose access to current fridge
            console.log('Quitted');
          }}
        />
      </BottomSheet>

      {/* Sorting products */}
      <BottomSheet title='Sort by' reference={refSorting}>
        <SheetRow
          icon={displaySortIcon('Name')}
          text='Name'
          onPress={() => {
            onSortPress('Name');
          }}
        />
        <SheetRow
          icon={displaySortIcon('Producer')}
          text='Producer'
          onPress={() => {
            onSortPress('Producer');
          }}
        />
        <SheetRow
          icon={displaySortIcon('Quantity')}
          text='Quantity'
          onPress={() => {
            onSortPress('Quantity');
          }}
        />
        <SheetRow
          icon={displaySortIcon('Expiration date')}
          text='Expiration date'
          onPress={() => {
            onSortPress('Expiration date');
          }}
        />
      </BottomSheet>

      {/* Deleting fridge */}
      <Dialog
        title='Delete fridge'
        paragraph={`Are you sure you want to delete fridge ${
          fridge?.name ?? 'Unknown'
        }? This action cannot be undone.`}
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
              paddings={false}
            />
          </View>
        </Dialog>
      )}

      {/* Loading */}
      {isLoading && <LoadingOverlay />}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
