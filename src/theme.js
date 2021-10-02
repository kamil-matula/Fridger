import { DefaultTheme } from 'react-native-paper';

export const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2A2B2E', // cards, navbar, etc.
    primaryDark: '#111113', // status bar
    background: '#202124', // whole page
    text: '#E8EAED',
    activeTab: '#FFD300',
    inactiveTab: '#9AA0A6',
  },
};
