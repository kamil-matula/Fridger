import React from 'react';

import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import { N0, N1, N2, N3, N4, A, B, C, D, E, F } from 'assets/icons/nova-nutri';

const ScoresContainer = ({
  nutriScore,
  novaScore,
  iconStyle,
  containerStyle,
}) => {
  // Nova-Score icon:
  const novaIcon = (() => {
    if (novaScore === '1') return N1;
    if (novaScore === '2') return N2;
    if (novaScore === '3') return N3;
    if (novaScore === '4') return N4;
    return N0;
  })();

  // Nutri-Score icon:
  const nutriIcon = (() => {
    if (nutriScore === 'a') return A;
    if (nutriScore === 'b') return B;
    if (nutriScore === 'c') return C;
    if (nutriScore === 'd') return D;
    if (nutriScore === 'e') return E;
    return F;
  })();

  return (
    <View style={containerStyle}>
      <Image source={novaIcon} style={iconStyle} />
      <Image source={nutriIcon} style={iconStyle} />
    </View>
  );
};

ScoresContainer.propTypes = {
  nutriScore: PropTypes.oneOf([undefined, 'a', 'b', 'c', 'd', 'e']),
  novaScore: PropTypes.oneOf([undefined, '1', '2', '3', '4']),
  iconStyle: PropTypes.object.isRequired,
  containerStyle: PropTypes.object.isRequired,
};

export default ScoresContainer;
