import React, { useState } from 'react';

import { View, TextInput, Text } from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';

import { AppBar, FloatingActionButton } from 'components';
import { makeStyles, displayToast } from 'utils';

import { useAddShoppingListMutation } from 'services/fridger/shoppingLists';

const AddShoppingList = ({ navigation, route }) => {
  const activeFridge = route.params?.fridge;

  const styles = useStyles({ isFridge: !!route.params?.fridge });
  const { colors } = useTheme();

  // Text Input content:
  const [name, setName] = useState('');

  // Queries:
  const [addShoppingListQuery, { isLoading }] = useAddShoppingListMutation();

  return (
    <View style={styles.container}>
      <AppBar label='Create new shopping list' />
      <Divider />

      {/* Required content: shopping list name */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder='Write name'
        placeholderTextColor={colors.silverMetallic}
        maxLength={25}
      />
      <Divider />

      {/* Optional content: connecting to fridge */}
      <TouchableRipple
        onPress={() => {
          // Go to ChooseFridge page:
          navigation.navigate('ChooseFridge', {
            activeFridgeName: activeFridge ? activeFridge.name : null,
          });
        }}
      >
        <View style={styles.connectContainer}>
          <Text style={styles.connectTitle}>Connected to</Text>
          <View
            style={{
              justifyContent: 'center',
              height: 40,
            }}
          >
            <Text style={styles.connectedFridgeName}>
              {activeFridge ? activeFridge.name : 'No fridge selected'}
            </Text>
            {activeFridge && (
              <Text style={styles.connectedFridgeInfo}>
                {activeFridge.shared_with_count > 0
                  ? `${activeFridge.products_count} items  •  shared with ${activeFridge.shared_with_count} friends`
                  : `${activeFridge.products_count} items`}
              </Text>
            )}
          </View>
        </View>
      </TouchableRipple>
      <Divider />

      {/* Button at the bottom of the screen */}
      <FloatingActionButton
        centered
        label='add shopping list'
        onPress={() => {
          addShoppingListQuery({ name, fridge: activeFridge?.id })
            .unwrap()
            .then(() => navigation.goBack())
            .catch((error) => {
              if (error.data?.name) displayToast('Invalid name');
              else
                displayToast(
                  error.data?.non_field_errors || 'Unable to add shopping list'
                );
            });
        }}
        isLoading={isLoading}
      />
    </View>
  );
};

const useStyles = makeStyles((theme, { isFridge }) => ({
  // Required content:
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  input: {
    padding: 16,
    color: theme.colors.white,
    fontSize: 20,
  },

  // Optional content:
  connectContainer: { padding: 16 },
  connectTitle: { fontSize: 20, color: theme.colors.white, paddingBottom: 4 },
  connectedFridgeName: {
    color: isFridge ? theme.colors.white : theme.colors.silverMetallic,
    fontSize: 14,
    includeFontPadding: false,
  },
  connectedFridgeInfo: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
    includeFontPadding: false,
  },
}));

export default AddShoppingList;
