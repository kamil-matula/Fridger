import React, { useEffect, useRef, useState } from 'react';

import { FlatList, View, Text, Image } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';

import {
  AppBar,
  FloatingActionButton,
  BottomSheet,
  SheetRow,
  Separator,
  LoadingOverlay,
} from 'components';
import { FridgeDetailsRow } from 'components/fridges';
import { makeStyles, displayToast } from 'utils';
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
  useEditFridgeNameMutation,
  useSpecificFridgeQuery,
} from 'services/fridger/fridges';
import { useFridgeProductsQuery } from 'services/fridger/fridgeProducts';
import { DeleteFridge, ReduceQuantity } from 'dialogs';

const FridgeDetails = ({ route, navigation }) => {
  const styles = useStyles();
  const listOfSortingOptions = [
    { option: 'name', label: 'Name' },
    { option: 'producer_name', label: 'Producer' },
    { option: 'expiration_date', label: 'Expiration date' },
  ];

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

  // Dialog states:
  const [deletingDialogVisible, setDeletingDialogVisible] = useState(false);

  // Renaming:
  const [fridgeName, setFridgeName] = useState('');
  useEffect(() => {
    if (fridge) setFridgeName(fridge.name);
  }, [fridge]);
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

        // Rebuild appbar:
        setFridgeName(`${fridge.name} `);
        setFridgeName(fridge.name);
      });
  };

  // Reducing quantity:
  const [reduceQuantityItem, setReduceQuantityItem] = useState(null);
  const reduceQuantityOpen = (item) => {
    setReduceQuantityItem({
      id: item.id,
      name: item.name,
      currentQuantity: item.quantity_left,
      maxQuantity: quantity_base,
      unit: item.quantity_type,
    });
  };

  // Other actions:
  const refFridgeActions = useRef(null);

  return (
    <View style={styles.container}>
      <AppBar
        label={fridgeName}
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
            {
              listOfSortingOptions.find((e) => e.option === sortingCategoryName)
                .label
            }
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
                    productProducer: item.producer_name,
                    productExpirationDate: item.expiration_date,
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
            setDeletingDialogVisible(true);
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
        {listOfSortingOptions.map((element) => (
          <SheetRow
            key={element.option}
            icon={displaySortIcon(element.option)}
            text={element.label}
            onPress={() => onSortPress(element.option)}
          />
        ))}
      </BottomSheet>

      {/* Deleting fridge */}
      <DeleteFridge
        visible={deletingDialogVisible}
        setVisible={setDeletingDialogVisible}
        fridge={fridge}
        navigation={navigation}
      />

      {/* Reducing quantity */}
      <ReduceQuantity
        item={reduceQuantityItem}
        setItem={setReduceQuantityItem}
      />
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
}));

export default FridgeDetails;
