import React, { useState } from 'react';

import { View, TextInput } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';

import { AppBar, FloatingActionButton } from 'components';
import { makeStyles, displayToast } from 'utils';
import { useAddFridgeMutation } from 'services/fridger/fridges';

const AddFridge = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  // Text Input content:
  const [name, setName] = useState('');

  // Queries:
  const [addFridgeQuery, { isLoading }] = useAddFridgeMutation();

  // Send data to api:
  const addFridge = () => {
    addFridgeQuery(name)
      .unwrap()
      .then(() => navigation.goBack())
      .catch((error) => {
        if (error.data?.name) displayToast('Invalid name of fridge');
        else
          displayToast(error.data?.non_field_errors || 'Unable to add fridge');
      });
  };

  return (
    <View style={styles.container}>
      <AppBar label='Create new fridge' />
      <Divider />
      <TextInput
        style={styles.input}
        placeholder='Write name'
        placeholderTextColor={colors.silverMetallic}
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <Divider />

      <FloatingActionButton
        centered
        label='Add fridge'
        onPress={addFridge}
        isLoading={isLoading}
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
}));

export default AddFridge;
