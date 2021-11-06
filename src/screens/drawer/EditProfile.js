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
import { tmpPerson } from 'assets/images';
import { edit } from 'assets/icons';

const EditProfile = ({ navigation }) => {
  const styles = useStyles();

  const { control, handleSubmit, setFocus, setValue, watch } = useForm({
    defaultValues: {
      avatar: null,
      nick: '',
      name: '',
      surname: '',
      email: '',
    },
  });

  const avatarUri = watch('avatar');

  const rules = {
    nick: {
      required: 'Nick is required',
      minLength: {
        value: 5,
        message: 'Nick must contain at least 5 characters',
      },
      maxLength: {
        value: 20,
        message: 'Nick cannot contain no more than 20 characters',
      },
    },
    name: {
      maxLength: {
        value: 20,
        message: 'Name cannot contain more than 20 characters',
      },
    },
    surname: {
      maxLength: {
        value: 20,
        message: 'Surname cannot contain more than 20 characters',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Invalid email format',
      },
    },
  };

  const saveChanges = (data) => {
    // TODO: Send request to API to update profile
    console.log('editProfile', data);

    // Go back to Home Page:
    navigation.goBack();
  };

  // Changing avatar:
  const openImagePickerAsync = async () => {
    // Checking if there are permissions to browse user's images:
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Opening file browser to choose new image:
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    // Setting new image:
    setValue('avatar', pickerResult.uri);
  };

  return (
    <View style={styles.container}>
      <AppBar label='Edit profile' />
      <ScrollViewLayout>
        {/* Input fields and image picker */}
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
            rules={rules.nick}
            onSubmitEditing={() => setFocus('name')}
            name='nick'
            label='Nick'
            returnKeyType='next'
            placeholder='Enter your nick'
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.name}
            onSubmitEditing={() => setFocus('surname')}
            name='name'
            label='Name'
            returnKeyType='next'
            placeholder='Enter your name'
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.surname}
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

        {/* Button */}
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
