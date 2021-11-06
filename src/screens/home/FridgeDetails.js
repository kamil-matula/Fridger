import React, { useRef, useState } from 'react';

import { FlatList, View, Text, Image } from 'react-native';
import { Divider, TouchableRipple } from 'react-native-paper';

import {
  AppBar,
  FloatingActionButton,
  FridgeDetailsRow,
  BottomSheet,
  SheetRow,
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

const DATA = [
  {
    id: 1,
    name: 'Pain de mie à la farine complète',
    producer: 'La Boulangère Bio',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',
  },
  {
    id: 2,
    name: 'Pain de mie à la farine complète',
    producer: 'La Boulangère Bio',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',
  },
  {
    id: 3,
    name: 'Pain de mie à la farine complète',
    producer: 'La Boulangère Bio',
    currentQuantity: 200,
    maxQuantity: 500,
    quantityType: 'g',
    expirationDate: '31.12.2025',
    image:
      'https://world.openfoodfacts.org/images/products/376/004/979/0214/front_fr.132.full.jpg',
  },
];

const FridgeDetails = ({ navigation }) => {
  const styles = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [sortingCategoryName, setSortingCategoryName] = useState('Name');
  // eslint-disable-next-line no-unused-vars
  const [sortingDirection, setSortingDirection] = useState('asc');

  const refBS = useRef(null);

  return (
    <View style={styles.container}>
      {/* TODO: Use label and items from specific fridge */}
      <AppBar
        label='Home'
        icon1={more}
        onPressIcon1={() => {
          refBS.current.open();
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
        data={DATA}
        renderItem={({ item }) => <FridgeDetailsRow product={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <FloatingActionButton
        onPress={() => {
          // TODO: Add navigating to "ADD PRODUCT PAGE"
        }}
      />
      <BottomSheet reference={refBS}>
        <SheetRow
          icon={groupAdd}
          text='Share'
          onPress={() => {
            refBS.current.close();
            navigation.push('DrawerNavigator', {
              screen: 'Share',
              params: { fridgeID: 1 },
            });
          }}
        />
        <SheetRow
          icon={group}
          text='Manage people'
          onPress={() => {
            refBS.current.close();
            navigation.push('DrawerNavigator', {
              screen: 'EditPermission',
              params: { fridgeID: 1 },
            });
          }}
        />
        <SheetRow icon={deleteIcon} text='Delete fridge' onPress={() => {}} />
        <SheetRow icon={logout} text='Quit' onPress={() => {}} />
      </BottomSheet>
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
