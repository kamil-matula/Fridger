import React from 'react';

import { View, TextInput, Text } from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';

import { AppBar, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';
import { fridgesList } from 'tmpData';

const AddShoppingList = ({ navigation }) => {
  // TODO: Change it to useState (or something else) after adding Redux, because
  // currently we are not able to pass [activeFridge, setActiveFridge]
  // in route params and the docs suggest using useContext to have this
  // variable both in AddShoppingList and ChooseFridge pages.
  const activeFridge = fridgesList[0]; // alternative: const activeFridge = null;

  const styles = useStyles({ activeFridge });
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <AppBar label='Create new shopping list' />
      <Divider />

      {/* Required content: shopping list name */}
      <TextInput
        style={styles.input}
        placeholder='Write name'
        placeholderTextColor={colors.silverMetallic}
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
                {activeFridge.people > 1
                  ? `${activeFridge.items} items  •  shared with ${
                      activeFridge.people - 1
                    } friends`
                  : `${activeFridge.items} items`}
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
          // TODO: Send request to API and add shopping list to user

          // Go back to shopping lists list:
          navigation.goBack();
        }}
      />
    </View>
  );
};

const useStyles = makeStyles((theme, { activeFridge }) => ({
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
    color: activeFridge ? theme.colors.white : theme.colors.silverMetallic,
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
