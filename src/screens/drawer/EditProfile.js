import React, { useRef, useState } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { makeStyles } from '../../utils';
import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
} from '../../components';
import tmpPerson from '../../../assets/images/tmpPerson.jpg';
import edit from '../../../assets/images/edit.png';

const EditProfile = ({ navigation }) => {
  const styles = useStyles();

  const [avatarUri, setAvatarUri] = useState(null);
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();

  const saveChanges = () => {
    navigation.goBack();
  };

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setAvatarUri(pickerResult.uri);
  };

  return (
    <View style={styles.container}>
      <AppBar label='Edit profile' />
      <ScrollViewLayout>
        <View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Image
                style={styles.avatar}
                source={avatarUri !== null ? { uri: avatarUri } : tmpPerson}
              />
              <View style={styles.badgeContainer}>
                <Image style={styles.badge} source={edit} />
              </View>
            </TouchableOpacity>
          </View>
          <InputField
            label='Nick'
            textInputProps={{
              onChangeText: setNick,
              value: nick,
              returnKeyType: 'next',
              placeholder: 'Enter your nick',
              onSubmitEditing: () => nameRef?.current?.focus(),
            }}
          />
          <Separator />
          <InputField
            label='Name'
            textInputProps={{
              onChangeText: setName,
              value: name,
              returnKeyType: 'next',
              placeholder: 'Enter your name',
              onSubmitEditing: () => surnameRef?.current?.focus(),
              ref: nameRef,
            }}
          />
          <Separator />
          <InputField
            label='Surname'
            textInputProps={{
              onChangeText: setSurname,
              value: surname,
              returnKeyType: 'next',
              placeholder: 'Enter your surname',
              onSubmitEditing: () => emailRef?.current?.focus(),
              ref: surnameRef,
            }}
          />
          <Separator />
          <InputField
            label='Email'
            textInputProps={{
              onChangeText: setEmail,
              value: email,
              returnKeyType: 'done',
              placeholder: 'Enter your email',
              autoComplete: 'email',
              keyboardType: 'email-address',
              onSubmitEditing: () => buttonRef?.current?.focus(),
              ref: emailRef,
            }}
          />
          <Separator height={32} />
        </View>
        <View>
          <Button
            label='save changes'
            variant='contained'
            onPress={saveChanges}
          />
          <Separator />
        </View>
      </ScrollViewLayout>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  badgeContainer: {
    backgroundColor: theme.colors.blueJeans,
    borderRadius: 32,
    padding: 8,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  badge: {
    width: 32,
    height: 32,
    tintColor: theme.colors.text,
  },
}));

export default EditProfile;
