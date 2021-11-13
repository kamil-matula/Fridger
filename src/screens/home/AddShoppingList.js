import React from 'react';

import { View, TextInput, Text } from 'react-native';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';

import { AppBar, FloatingActionButton, FoodTypes } from 'components';
import { makeStyles } from 'utils';

const AddShoppingList = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar label='Create new shopping list' />
      <Divider style={styles.divider} />

      {/* Necessary content: shopping list name */}
      <TextInput
        style={styles.input}
        placeholder='Write name'
        placeholderTextColor={colors.silverMetallic}
      />
      <Divider style={styles.divider} />

      {/* Optional content: connecting to fridge */}
      <TouchableRipple
        onPress={() => {
          // Go to ChooseFridge page:
          navigation.navigate('ChooseFridge');
        }}
      >
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, color: colors.white }}>
            Connected to
          </Text>
          <View style={{ paddingTop: 8 }}>
            <Text
              style={{
                color: colors.silverMetallicSemiTransparent,
                fontSize: 14,
                paddingBottom: 8,
              }}
            >
              No fridge selected
            </Text>
            <FoodTypes disabled />
          </View>
        </View>
      </TouchableRipple>
      <Divider style={styles.divider} />

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

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  input: {
    padding: 16,
    color: theme.colors.white,
    fontSize: 20,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    height: 1,
  },
}));

export default AddShoppingList;
