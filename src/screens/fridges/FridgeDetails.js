import React, { useRef, useState } from 'react';

import { View, Text, Image, ScrollView } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';

import {
  FloatingActionButton,
  BottomSheet,
  SheetRow,
  Separator,
  ActivityIndicator,
  AppBarRenamer,
  Placeholder,
} from 'components';
import { FridgeDetailsRow } from 'components/fridges';
import { makeStyles } from 'utils';
import { group, groupAdd, deleteIcon, logout, down, up } from 'assets/icons';
import {
  useEditFridgeNameMutation,
  useSpecificFridgeQuery,
} from 'services/fridger/fridges';
import { useFridgeProductsQuery } from 'services/fridger/fridgeProducts';
import { DeleteFridge, LeaveFridge, ReduceQuantity } from 'dialogs';

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
      return sortingDirection === '' ? down : up;
    return null;
  };

  // Queries:
  const { data: fridge, isLoading: isFridgeLoading } = useSpecificFridgeQuery(
    fridgeID,
    { pollingInterval: 5000 }
  );
  const { data: fridgeProducts, isLoading: areProductsLoading } =
    useFridgeProductsQuery(
      {
        fridge: fridgeID,
        ordering: sortingDirection + sortingCategoryName,
      },
      { pollingInterval: 5000 }
    );
  const [editFridgeNameQuery] = useEditFridgeNameMutation();

  // Deleting fridge:
  const [deletingDialogVisible, setDeletingDialogVisible] = useState(false);

  // Reducing quantity:
  const [reduceQuantityItem, setReduceQuantityItem] = useState(null);
  const reduceQuantityOpen = (item) => setReduceQuantityItem(item);

  // Leaving fridge:
  const [leavingDialogVisible, setLeavingDialogVisible] = useState(false);

  // Other actions:
  const refFridgeActions = useRef(null);

  return (
    <View style={styles.container}>
      <AppBarRenamer
        label={fridge?.name}
        onPressIcon={() => refFridgeActions.current.open()}
        query={editFridgeNameQuery}
        confirmMessage='Fridge renamed'
        errorMessage='Unable to rename fridge'
        containerID={fridge?.id}
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
            source={sortingDirection === '' ? down : up}
            style={styles.icon}
          />
        </View>
      </TouchableRipple>

      {/* List of products */}
      {isFridgeLoading || areProductsLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {fridgeProducts?.length > 0 ? (
            <ScrollView>
              {fridgeProducts.map((item) => (
                <FridgeDetailsRow
                  key={item.id}
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
              ))}

              {/* Space for FAB and nav bar */}
              <Separator height={54 + 88} />
            </ScrollView>
          ) : (
            <>
              <Placeholder content='No products to display' />
              {/* Space for nav bar */}
              <Separator height={54} />
            </>
          )}
        </>
      )}

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
          text='Leave'
          onPress={() => {
            // Hide bottom sheet and show dialog responsible for deleting fridge:
            refFridgeActions.current.close();
            setLeavingDialogVisible(true);
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

      {/* Leaving fridge */}
      <LeaveFridge
        visible={leavingDialogVisible}
        setVisible={setLeavingDialogVisible}
        fridge={fridge}
        navigation={navigation}
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
  icon: {
    height: 16,
    width: 16,
    marginLeft: 10,
    tintColor: theme.colors.silverMetallic,
  },
}));

export default FridgeDetails;
