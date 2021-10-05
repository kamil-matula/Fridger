import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export const makeStyles =
  (styles) =>
  (props = null) => {
    const theme = useTheme();
    return StyleSheet.create(styles(theme, props));
  };
