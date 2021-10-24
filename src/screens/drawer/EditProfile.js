import React from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';

import { makeStyles } from 'utils';
import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
} from 'components';
import tmpPerson from 'assets/images/tmpPerson.jpg';
import edit from 'assets/images/edit.png';

const EditProfile = ({ navigation }) => {
  const styles = useStyles();

  const { control, handleSubmit, setFocus, setValue, watch } = useForm({
    defaultValues: {
      avatar: null,
      name: '',
      surname: '',
      nick: '',
    },
  });

  const avatarUri = watch('avatar');

  const rules = {
    email: {
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Invalid email's format",
      },
    },
  };

  const saveChanges = (data) => {
    console.log('editProfile', data);
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

    setValue('avatar', pickerResult.uri);
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
                source={avatarUri === null ? tmpPerson : { uri: avatarUri }}
              />
              <View style={styles.badgeContainer}>
                <Image style={styles.badge} source={edit} />
              </View>
            </TouchableOpacity>
          </View>
          <InputField
            control={control}
            onSubmitEditing={() => setFocus('name')}
            name='name'
            label='Nick'
            returnKeyType='next'
            placeholder='Enter your nick'
          />
          <Separator />
          <InputField
            control={control}
            onSubmitEditing={() => setFocus('surname')}
            name='name'
            label='Name'
            returnKeyType='next'
            placeholder='Enter your name'
          />
          <Separator />
          <InputField
            control={control}
            onSubmitEditing={() => setFocus('email')}
            name='surname'
            label='Surname'
            returnKeyType='next'
            placeholder='Enter your surname'
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.email}
            name='email'
            label='Email'
            returnKeyType='done'
            placeholder='Enter your email'
            autoComplete='email'
            keyboardType='email-address'
          />
          <Separator height={32} />
        </View>
        <View>
          <Button
            label='save changes'
            variant='contained'
            onPress={handleSubmit(saveChanges)}
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
