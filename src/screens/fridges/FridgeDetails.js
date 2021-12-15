import React, { useRef, useState } from 'react';

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
import { makeStyles, displayToast, dateFromBackToFront } from 'utils';
import {
  group,
  groupAdd,
  deleteIcon,
  logout,
  more,
  down,
  up,
} from 'assets/icons';
import {
  useDeleteFridgeMutation,
  useEditFridgeNameMutation,
  useSpecificFridgeQuery,
} from 'services/fridger/fridges';
import { useFridgeProductsQuery } from 'services/fridger/fridgeProducts';

const FridgeDetails = ({ route, navigation }) => {
  const styles = useStyles();

  // Fridge identifying:
  const { fridgeID } = route.params;

  // Sorting:
  const [sortingCategoryName, setSortingCategoryName] = useState('name');
  const [sortingDirection, setSortingDirection] = useState('');
  const refSorting = useRef(null);
  const onSortPress = (category) => {
    // Hide bottom sheet and set new sorting:
    if (sortingCategoryName === category)
      setSortingDirection((it) => (it === '' ? '-' : ''));
    else setSortingCategoryName(category);
    refSorting.current.close();
  };
  const displaySortIcon = (category) => {
    if (sortingCategoryName === category)
      return sortingDirection === '' ? up : down;
    return null;
  };

  // Queries:
  const { data: fridge, isLoading: isFridgeLoading } =
    useSpecificFridgeQuery(fridgeID);
  const { data: fridgeProducts, isLoading: areProductsLoading } =
    useFridgeProductsQuery({
      fridge: fridgeID,
      ordering: sortingDirection + sortingCategoryName,
    });
  const [editFridgeNameQuery] = useEditFridgeNameMutation();
  const [deleteFridgeQuery] = useDeleteFridgeMutation();

  // Send data to api:
  const editFridgeName = (name) => {
    editFridgeNameQuery({ id: fridgeID, name })
      .unwrap()
      .then(() => displayToast('Fridge renamed'))
      .catch((error) => {
        if (error.data?.name) displayToast('Invalid name');
        else
          displayToast(
            error.data?.non_field_errors || 'Unable to rename fridge'
          );

        // TODO: Reset appbar's value
      });
  };
  const deleteFridge = () => {
    deleteFridgeQuery(fridgeID)
      .unwrap()
      .then(() => {
        displayToast('Fridge deleted');
        setDeleteFridgeDialogVisible(false);
        navigation.pop();
      })
      .catch((error) =>
        displayToast(error.data?.non_field_errors || 'Unable to delete fridge')
      );
  };

  // Deleting:
  const [deleteFridgeDialogVisible, setDeleteFridgeDialogVisible] =
    useState(false);
  const confirmRemoveFridge = () => deleteFridge();
  const cancelRemoveFridge = () => setDeleteFridgeDialogVisible(false);

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
    // Set item and display dialog:
    setReduceQuantityItem(item);
    setValue('quantity', item.currentQuantity.toString());
    setReduceQuantityVisible(true);
  };

  // Other actions:
  const refFridgeActions = useRef(null);

  return (
    <View style={styles.container}>
      <AppBar
        label={fridge?.name ?? ''}
        icon1={more}
        onPressIcon1={() => refFridgeActions.current.open()}
        onSubmitEditing={editFridgeName}
        editable
      />
      <Divider />

      {/* Sorting products */}
      <TouchableRipple onPress={() => refSorting.current.open()}>
        <View style={styles.sortingLabel}>
          <Text style={styles.text}>
            {sortingCategoryName.charAt(0).toUpperCase() +
              sortingCategoryName.slice(1)}
          </Text>
          <Image
            source={sortingDirection === '' ? up : down}
            style={styles.icon}
          />
        </View>
      </TouchableRipple>

      {/* List of products */}
      {isFridgeLoading || areProductsLoading ? (
        <LoadingOverlay />
      ) : (
        <FlatList
          data={fridgeProducts}
          renderItem={({ item }) => (
            <FridgeDetailsRow
              product={item}
              onPressIcon={() => reduceQuantityOpen(item)}
              onPressRow={() => {
                // Go to appropriate page:
                if (fridge != null)
                  navigation.navigate('ProductDetails', {
                    fridgeName: fridge.name,
                    productID: item.id,
                    productName: item.name,
                    productProducer: item.producer,
                    productExpirationDate: dateFromBackToFront(
                      item.expiration_date
                    ),
                    productBarcode: item.barcode,
                  });
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Space for bottom nav bar */}
      <Separator height={54} />

      {/* Adding new product */}
      <FloatingActionButton
        onPress={() => navigation.navigate('AddProductManual', { fridgeID })}
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
              navigation.navigate('ShareFridge', {
                containerID: fridge.id,
                containerName: fridge.name,
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
              navigation.navigate('EditPermissionsFridge', {
                containerID: fridge.id,
                containerName: fridge.name,
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
        {['name', 'producer', 'expiration date'].map((element) => (
          <SheetRow
            key={element}
            icon={displaySortIcon(element)}
            text={element.charAt(0).toUpperCase() + element.slice(1)}
            onPress={() => onSortPress(element)}
          />
        ))}
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
