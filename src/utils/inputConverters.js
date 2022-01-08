export const convertToNumber = (value) => {
  const valueAsString = value.toString();
  const tmp = valueAsString.replace(',', '.');
  if (!Number.isNaN(Number(tmp))) return tmp;
  return valueAsString.substring(0, valueAsString.length - 1);
};
