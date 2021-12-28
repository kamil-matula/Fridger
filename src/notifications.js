import React, { useEffect } from 'react';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import { displayToast } from 'utils';

const NotificationListener = () => {
  const navigation = useNavigation();

  // Retrieving and saving expo token:
  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        await AsyncStorage.setItem('expoToken', token);
      }
    });
  }, []);

  // Handling with opening app via clicking notification:
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const { data } = lastNotificationResponse.notification.request.content;
      // Go to Friends:
      if (data.friend_id) {
        // TODO: Refetch list of friends to make displaying updates
        // faster than it is implemented in polling functionality
        navigation.navigate('Friends');
      }

      // TODO: Handle with Expiration Date Notification (redirect to specific fridge)
    }
  }, [lastNotificationResponse]);

  return <></>;
};

// Configuration for notifications:
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    // Check (and request for, if necessary) permissions:
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      displayToast('Failed to get permissions for push notifications');
      return null;
    }

    // Get expo token:
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } catch (e) {
      displayToast('Failed to get expo token');
    }
  } else {
    displayToast('Push notifications are disabled on non-physical devices');
    return null;
  }

  return token;
};

export default NotificationListener;
