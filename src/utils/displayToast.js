import Toast from 'react-native-root-toast';

export const displayToast = (value) => {
  if (value) {
    let message;
    try {
      message = value.join(' ');
    } catch (e) {
      message = value;
    }

    Toast.show(message, {
      backgroundColor: 'gray',
      opacity: 1.0,
      duration: 1000,
      position: -64,
      shadow: false,
    });
  }
};
