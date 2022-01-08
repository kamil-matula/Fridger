import { metricPrefix } from 'utils/constants';

export const convertToNumber = (value) => {
  const valueAsString = value.toString();
  const tmp = valueAsString.replace(',', '.');
  if (!Number.isNaN(Number(tmp))) return tmp;
  return valueAsString.substring(0, valueAsString.length - 1);
};

export const convertQuantity = (quantity, from, to) => {
  const fromBaseUnit = from.slice(-1);
  const fromMetricPrefix = from.slice(0, -1);
  const toBaseUnit = to.slice(-1);
  const toMetricPrefix = to.slice(0, -1);

  let newQuantity = parseFloat(quantity);
  if (fromBaseUnit === toBaseUnit) {
    newQuantity *=
      metricPrefix[fromMetricPrefix] / metricPrefix[toMetricPrefix];
  }

  return newQuantity.toString();
};
