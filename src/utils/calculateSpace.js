import { Dimensions } from 'react-native';

export const calculateSpace = ({
  contentHeightTop = 0,
  inputFieldsAmount = 0,
  contentHeightBottom = 0,
}) => {
  const windowHeight = Dimensions.get('window').height - 20;

  let result = 0.0;
  result += contentHeightTop;
  if (inputFieldsAmount > 0)
    result += inputFieldsAmount * (27 + 48) + (inputFieldsAmount - 1) * 16;
  result += contentHeightBottom;

  result = windowHeight - result;

  return result > 30 ? result : 30;
};
