import { DarkTheme } from 'react-native-paper';

export const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#2A2B2E', // cards, navbar, etc.
    richBlack: '#111113', // status bar
    background: '#202124', // whole page
    accent: '#5DADEC', // snackbar action
    text: '#E8EAED',
    whiteSemiTransparent: '#E8EAED80',
    cyberYellow: '#FFD300', // active tab
    silverMetallic: '#9AA0A6', // inactive tab
    blueJeans: '#5DADEC', // buttons
    darkGreen: '#006400', // green circles
    tartOrange: '#FF4D4D', // buttons
    blackSemiTransparent: '#00000080',
  },
};
