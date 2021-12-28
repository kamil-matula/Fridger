import React, { useState, useEffect, useRef } from 'react';

import { Text, View } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { displayToast } from 'utils';

const NotificationListener = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      console.log(token);
    });

    // This listener is fired whenever a notification is received
    // while the app is foregrounded:
    notificationListener.current =
      Notifications.addNotificationReceivedListener((not) =>
        setNotification(not)
      );

    // This listener is fired whenever a user taps on or interacts
    // with a notification (works when app is foregrounded, backgrounded or killed):
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
    </View>
  );
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
