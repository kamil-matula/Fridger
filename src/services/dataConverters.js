const getSecondElementOfPair = (object, keyOrVal) => {
  if (Object.keys(object).includes(keyOrVal)) {
    return object[keyOrVal];
  }
  if (Object.values(object).includes(keyOrVal)) {
    return Object.keys(object).find((key) => object[key] === keyOrVal);
  }

  throw new Error(
    `Unsupported status ${keyOrVal}. Expected one of: ${Object.values(
      object
    ).concat(Object.keys(object))}`
  );
};

export const convertStatus = (status) => {
  keyVal = {
    FREE: 'free',
    TAKER: 'unchecked',
    TAKER_MARKED: 'indeterminate',
    BUYER: 'checked',
  };

  return getSecondElementOfPair(keyVal, status);
};

export const convertQuantityType = (type) => {
  keyVal = {
    PIECE: 'pcs',
    ML: 'ml',
    L: 'l',
    G: 'g',
    KG: 'kg',
  };

  return getSecondElementOfPair(keyVal, type);
};
