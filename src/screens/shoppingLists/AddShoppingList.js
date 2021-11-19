import React from 'react';

import { View, TextInput } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';

import { AppBar, FloatingActionButton } from 'components';
import { makeStyles } from 'utils';

const AddShoppingList = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <AppBar label='Create new shopping list' />
      <Divider style={styles.divider} />
      <TextInput
        style={styles.input}
        placeholder='Write name'
        placeholderTextColor={colors.silverMetallic}
      />
      <Divider style={styles.divider} />
      <FloatingActionButton
        centered
        label='add shopping list'
        onPress={() => {
          // TODO: Send request to API and add shopping list to user

          // Go back to shopping lists list:
          navigation.goBack();
        }}
      />
      {/* TODO: Connect to fridge section */}
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
