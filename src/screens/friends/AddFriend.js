import React, { useState } from 'react';

import { View, TextInput, Image, Text } from 'react-native';
import { Divider, useTheme, Snackbar } from 'react-native-paper';

import {
  AppBar,
  UserDataRow,
  Button,
  ScrollViewLayout,
  Separator,
} from 'components';
import { makeStyles } from 'utils';
import { tmpPerson } from 'assets/images';

const AddFriend = ({ navigation }) => {
  const theme = useTheme();
  const styles = useStyles();

  const [friend, setFriend] = useState(null);
  const [found, setFound] = useState(false);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const find = () => {
    // TODO: Add sending request to API to find user with given ID

    // Update UI:
    const userHasBeenFound = true;
    setFriend({
      avatarUri: null,
      nick: 'Minkx',
      name: 'Ardelle',
      surname: 'Coppage',
    });
    setFound(userHasBeenFound);
    if (!userHasBeenFound) {
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Main content */}
      <AppBar label='Add friend' />
      <Divider />
      <TextInput
        style={styles.input}
        placeholder='Paste friend ID'
        placeholderTextColor={theme.colors.silverMetallic}
        keyboardType='numeric'
        onEndEditing={find}
      />
      <Divider />
      {found && (
        <>
          <ScrollViewLayout>
            <View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.avatar}
                  source={
                    friend.avatarUri !== null
                      ? { uri: friend.avatarUri }
                      : tmpPerson
                  }
                />
              </View>
              <UserDataRow label='Nick' data={friend.nick} />
              <Separator />
              <UserDataRow label='Name' data={friend.name} />
              <Separator />
              <UserDataRow label='Surname' data={friend.surname} />
              <Separator height={32} />
            </View>
            <View>
              <Button
                label='add to friends'
                variant='contained'
                onPress={() => {
                  // TODO: Send request to API to add to friends

                  // Return to list of friends:
                  navigation.goBack();
                }}
              />
              <Separator />
            </View>
          </ScrollViewLayout>
        </>
      )}

      {/* Displaying negative result of searching */}
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'dismiss',
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        <Text style={styles.snackbarText}>User not found</Text>
      </Snackbar>
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
  imageContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: theme.colors.silverMetallic,
  },
  snackbar: {
    backgroundColor: theme.colors.primary,
  },
  snackbarText: {
    color: theme.colors.white,
  },
}));

export default AddFriend;
