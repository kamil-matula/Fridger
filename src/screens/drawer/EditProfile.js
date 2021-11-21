import React, { useEffect } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';

import {
  useUserInfoQuery,
  useUpdateUserInfoMutation,
} from 'services/fridger/user';
import { makeStyles } from 'utils';
import {
  InputField,
  Button,
  AppBar,
  ScrollViewLayout,
  Separator,
  LoadingOverlay,
} from 'components';
import { tmpPerson } from 'assets/images';
import { edit } from 'assets/icons';

const EditProfile = ({ navigation }) => {
  const styles = useStyles();

  // Queries
  const userInfo = useUserInfoQuery();
  const [updateUser, updateUserStatus] = useUpdateUserInfoMutation();

  // Form states
  const { control, handleSubmit, setFocus, setValue, watch } = useForm({
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      avatar: null,
    },
  });

  // Update when data fetched
  useEffect(() => {
    setValue('username', userInfo.data?.username);
    setValue('first_name', userInfo.data?.first_name);
    setValue('last_name', userInfo.data?.last_name);
    setValue('email', userInfo.data?.email);
    setValue('avatar', userInfo.data?.avatar);
  }, [userInfo.data, setValue]);

  const avatar = watch('avatar');

  const rules = {
    username: {
      required: 'Username is required',
      minLength: {
        value: 5,
        message: 'Username must contain at least 5 characters',
      },
      maxLength: {
        value: 20,
        message: 'Username cannot contain no more than 20 characters',
      },
    },
    firstName: {
      maxLength: {
        value: 20,
        message: 'First name cannot contain more than 20 characters',
      },
    },
    lastName: {
      maxLength: {
        value: 20,
        message: 'Last name cannot contain more than 20 characters',
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

  // Send to api
  const saveChanges = (dataToSend) => {
    updateUser(dataToSend)
      .unwrap()
      .then(() => navigation.goBack())
      .catch((error) => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(error, ToastAndroid.SHORT);
        } else {
          AlertIOS.alert(error);
        }
      });
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
    setValue('avatar', pickerResult);
  };

  return (
    <View style={styles.container}>
      <AppBar label='Edit profile' />
      {userInfo.isLoading && <LoadingOverlay />}
      <ScrollViewLayout>
        {/* Input fields and image picker */}
        <View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={openImagePickerAsync}>
              <Image
                style={styles.avatar}
                source={avatar === null ? tmpPerson : { uri: avatar.uri }}
              />
              <View style={styles.badgeContainer}>
                <Image style={styles.badge} source={edit} />
              </View>
            </TouchableOpacity>
          </View>
          <InputField
            control={control}
            rules={rules.username}
            name='username'
            label='Username'
            returnKeyType='next'
            placeholder='Enter your nick'
            onSubmitEditing={() => setFocus('first_name')}
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.firstName}
            name='first_name'
            label='First Name'
            returnKeyType='next'
            placeholder='Enter your first name'
            onSubmitEditing={() => setFocus('last_name')}
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.lastName}
            name='last_name'
            label='Last Name'
            returnKeyType='next'
            placeholder='Enter your last name'
            onSubmitEditing={() => setFocus('email')}
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
            isLoading={updateUserStatus.isLoading}
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
    tintColor: theme.colors.white,
  },
}));

export default EditProfile;
