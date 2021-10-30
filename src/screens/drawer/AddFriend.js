import React, { useState } from 'react';

import { View, TextInput, Image, Text } from 'react-native';
import { Divider, useTheme, Snackbar } from 'react-native-paper';

import {
  AppBar,
  UserDataRow,
  Button,
  ScrollViewLayout,
  Separator,
} from '../../components';
import { makeStyles } from '../../utils';
import tmpPerson from '../../../assets/images/tmpPerson.jpg';

const AddFriend = () => {
  const theme = useTheme();
  const styles = useStyles();

  const [avatarUri, setAvatarUri] = useState(null);
  const [nick, setNick] = useState('Minkx');
  const [name, setName] = useState('Ardelle');
  const [surname, setSurname] = useState('Coppage');

  const [found, setFound] = useState(false);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const find = () => {
    //do stuff
    userHasBeenFound = true;

    setFound(userHasBeenFound);
    if (!userHasBeenFound) {
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar label='Add friend' />
      <Divider style={styles.divider} />
      <TextInput
        style={styles.input}
        placeholder='Paste friend ID'
        placeholderTextColor={theme.colors.silverMetallic}
        keyboardType='numeric'
        onEndEditing={find}
      />
      <Divider style={styles.divider} />
      {found && (
        <>
          <ScrollViewLayout>
            <View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.avatar}
                  source={avatarUri !== null ? { uri: avatarUri } : tmpPerson}
                />
              </View>
              <UserDataRow label='Nick' data={nick} />
              <Separator height={16} />
              <UserDataRow label='Name' data={name} />
              <Separator height={16} />
              <UserDataRow label='Surname' data={surname} />
              <Separator height={64} />
            </View>
          </ScrollViewLayout>
          <Button label='add to friends' variant='contained' fab={true} />
        </>
      )}
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
    color: theme.colors.text,
    fontSize: 20,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
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
    color: theme.colors.text,
  },
}));

export default AddFriend;
