import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

/**
 * @template T
 * @extends StyleSheet.NamedStyles<T>
 * @callback styles<T>
 * @param {ReactNativePaper.Theme} [theme]
 * @param {object} [props]
 * @returns {T}
 */

/**
 * @template T
 * @extends StyleSheet.NamedStyles<T>
 * @callback useStyles<T>
 * @param {object} [props]
 * @returns {T}
 */

/**
 * @template T
 * @extends StyleSheet.NamedStyles<T>
 * @param {styles<T>} styles
 * @returns {useStyles<T>}
 */
export const makeStyles =
  (styles) =>
  (props = null) => {
    const theme = useTheme();
    return StyleSheet.create(styles(theme, props));
  };
