import { AlertIOS, ToastAndroid, Platform } from 'react-native';

export const displayToast = (value) => {
  if (value) {
    let message;
    try {
      message = value.join(' ');
    } catch (e) {
      message = value;
    }
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(message);
    }
  }
};
