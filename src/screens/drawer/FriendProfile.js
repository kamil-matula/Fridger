import React, { useState } from 'react';

import { View, Image, ScrollView } from 'react-native';
import { Dialog, Portal, Paragraph } from 'react-native-paper';

import { makeStyles } from '../../utils';
import { UserDataRow, Button, AppBar } from '../../components';
import deleteIcon from '../../../assets/images/delete.png';
import tmpPerson from '../../../assets/images/tmpPerson.jpg';

const FriendProfile = ({ navigation }) => {
  const styles = useStyles();

  const [avatarUri, setAvatarUri] = useState(null);
  const [nick, setNick] = useState('Minkx');
  const [name, setName] = useState('Ardelle');
  const [surname, setSurname] = useState('Coppage');

  const [dialogVisible, setDialogVisible] = useState(false);

  const removeFriend = () => {
    setDialogVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppBar icon1={deleteIcon} onPressIcon1={() => setDialogVisible(true)} />
      <ScrollView style={styles.SVcontainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.avatar}
            source={avatarUri !== null ? { uri: avatarUri } : tmpPerson}
          />
        </View>
        <UserDataRow label='Nick' data={nick} />
        <View style={styles.separatorVertical32} />
        <UserDataRow label='Name' data={name} />
        <View style={styles.separatorVertical32} />
        <UserDataRow label='Surname' data={surname} />
      </ScrollView>

      <Portal>
        <Dialog
          style={styles.dialog}
          visible={dialogVisible}
          onDismiss={() => {
            setDialogVisible(false);
          }}
        >
          <Dialog.Title>Remove from friends</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to remove {nick} from friends? This action
              cannot be undone.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button label='remove' color='red' onPress={removeFriend} />
            <View style={styles.separatorHorizontal8} />
            <Button label='cancle' onPress={() => setDialogVisible(false)} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  SVcontainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: theme.colors.silverMetallic,
  },
  dialog: {
    elevation: 0,
  },
  separatorVertical32: {
    marginVertical: 16,
  },
  separatorHorizontal8: {
    marginHorizontal: 4,
  },
}));

export default FriendProfile;
