import React, { useEffect } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
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
      firstName: '',
      lastName: '',
      email: '',
      avatar: '',
      canUseRealName: false,
    },
  });

  // Update when data fetched
  useEffect(() => {
    setValue('username', userInfo.data?.username);
    setValue('firstName', userInfo.data?.first_name);
    setValue('lastName', userInfo.data?.last_name);
    setValue('email', userInfo.data?.email);
    setValue('avatar', userInfo.data?.avatar);
    setValue('canUseRealName', userInfo.data?.can_use_real_name);
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
        const usernameError = error.data?.username;
        const firstNameError = error.data?.first_name;
        const lastNameError = error.data?.last_name;
        const emailError = error.data?.email;
        const generalError = error.data?.non_field_errors;
        if (usernameError) {
          setError('username', {
            type: 'server',
            message: usernameError.join(' '),
          });
        }
        if (firstNameError) {
          setError('first_name', {
            type: 'server',
            message: firstNameError.join(' '),
          });
        }
        if (lastNameError) {
          setError('last_name', {
            type: 'server',
            message: lastNameError.join(' '),
          });
        }
        if (emailError) {
          setError('email', {
            type: 'server',
            message: emailError.join(' '),
          });
        }
        if (generalError) {
          const message = generalError.join(' ');
          if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            AlertIOS.alert(message);
          }
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
    setValue('avatar', pickerResult.uri);
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
                source={avatar ? { uri: avatar } : tmpPerson}
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
            onSubmitEditing={() => setFocus('firstName')}
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.firstName}
            name='firstName'
            label='First Name'
            returnKeyType='next'
            placeholder='Enter your first name'
            onSubmitEditing={() => setFocus('firstName')}
          />
          <Separator />
          <InputField
            control={control}
            rules={rules.lastName}
            name='firstName'
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
