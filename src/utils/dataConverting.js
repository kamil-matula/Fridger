export const dateFromFrontToBack = (dateFromFront) =>
  dateFromFront ? dateFromFront.split('.').reverse().join('-') : null;

export const dateFromBackToFront = (dateFromBack) =>
  dateFromBack ? dateFromBack.split('-').reverse().join('.') : null;

export const unitFromFrontToBack = (unitFromFront) =>
  (unitFromFront === 'pcs' ? 'PIECE' : unitFromFront).toUpperCase();

export const unitFromBackToFront = (unitFromBack) =>
  (unitFromBack === 'PIECE' ? 'pcs' : unitFromBack).toLowerCase();

export const reasonFromFrontToBack = (reasonFromFront) => {
  if (reasonFromFront === 'eaten') return 'USED';
  if (reasonFromFront === 'wasted') return 'WASTED';
  if (reasonFromFront === 'disappeared') return 'UNTRACKED';
  return '';
};

export const quantityFromBackToFront = (quantityFromBack) =>
  parseFloat(quantityFromBack);

export const statusFromBackToFront = (statusFromBack) => {
  if (statusFromBack === 'TAKER') return 'unchecked';
  if (statusFromBack === 'TAKER_MARKED') return 'indeterminate';
  if (statusFromBack === 'BUYER') return 'checked';
  return 'unchecked';
};
