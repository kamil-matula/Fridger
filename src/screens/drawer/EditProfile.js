import React, { useEffect } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';

import {
  useUserInfoQuery,
  useUpdateUserInfoMutation,
} from 'services/fridger/user';
import { makeStyles, displayToast } from 'utils';
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

  // Queries:
  const { data: userData, isLoading: userIsLoading } = useUserInfoQuery();
  const [updateUser, { isLoading: updateUserIsLoading }] =
    useUpdateUserInfoMutation();

  // Form states:
  const { control, handleSubmit, setFocus, setValue, watch } = useForm({
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      avatar: '',
      canUseRealName: false,
    },
  });

  // Update states when data is fetched:
  useEffect(() => {
    setValue('username', userData?.username);
    setValue('firstName', userData?.first_name);
    setValue('lastName', userData?.last_name);
    setValue('avatar', userData?.avatar);
    setValue('canUseRealName', userData?.can_use_real_name);
  }, [userData]);

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
  };

  // Send data to api:
  const saveChanges = (dataToSend) => {
    updateUser(dataToSend)
      .unwrap()
      .then(() => {
        // Confirm action:
        displayToast('Profile successfully updated');

        // Leave page:
        navigation.goBack();
      })
      .catch((error) => {
        // Display error under specific input field...
        const usernameError = error.data?.username;
        const firstNameError = error.data?.first_name;
        const lastNameError = error.data?.last_name;
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

        // ... or display toast if it's different kind of problem:
        displayToast(error.data?.non_field_errors);
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

      {userIsLoading ? (
        <LoadingOverlay />
      ) : (
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
              label='First Name (optional)'
              returnKeyType='next'
              placeholder='Enter your first name'
              onSubmitEditing={() => setFocus('lastName')}
            />
            <Separator />
            <InputField
              control={control}
              rules={rules.lastName}
              name='lastName'
              label='Last Name (optional)'
              returnKeyType='done'
              placeholder='Enter your last name'
            />
            <Separator height={32} />
          </View>

          {/* Button */}
          <View>
            <Button
              label='save changes'
              variant='contained'
              onPress={handleSubmit(saveChanges)}
              isLoading={updateUserIsLoading}
            />
            <Separator />
          </View>
        </ScrollViewLayout>
      )}
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
