import React, { useRef, useState } from 'react';

import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { makeStyles } from '../../utils';
import { InputField, Button, AppBar } from '../../components';
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
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      <ScrollView style={styles.SVcontainer}>
        <View style={styles.imageContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Image style={styles.avatar} source={avatarUri !== null ? { uri: avatarUri } : tmpPerson} />
              <View style={styles.badgeContainer}>
                <Image style={styles.badge} source={edit} />
              </View>
            </TouchableOpacity>
          </View>
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
        <View style={styles.separator16}></View>
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
        <View style={styles.separator16}></View>
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
        <View style={styles.separator16}></View>
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
        <View style={styles.separator40}></View>
        <Button label='save changes' variant='contained' onPress={saveChanges} />
        <View style={styles.separator16} />
      </ScrollView>
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
  avatarContainer: {
    borderRadius: 9999,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: theme.colors.silverMetallic,
  },
  badgeContainer: {
    backgroundColor: theme.colors.blueJeans,
    borderRadius: 9999,
    padding: 8,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    tintColor: theme.colors.text,
  },
  separator16: {
    marginVertical: 8,
  },
  separator40: {
    marginVertical: 20,
  },
}));

export default EditProfile;
