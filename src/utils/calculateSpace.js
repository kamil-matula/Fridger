import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

export const calculateSpace = ({
  contentHeightTop = 0, // sum of heights of components above input fields (excluding AppBar)
  inputFieldsAmount = 0,
  contentHeightBottom = 0, // sum of heights of components below input fields
  isAppBar = false,
}) => {
  const windowHeight = Dimensions.get('window').height;

  let result = 0.0;
  result += contentHeightTop;
  if (inputFieldsAmount > 0)
    result += inputFieldsAmount * (27 + 48) + (inputFieldsAmount - 1) * 16;
  result += contentHeightBottom;
  if (isAppBar) result += 56 + Constants.statusBarHeight;

  result = windowHeight - result;

  return result > 30 ? result : 30;
};
