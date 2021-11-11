import React from 'react';

import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import { N1, N2, N3, N4, A, B, C, D, E } from 'assets/icons/nova-nutri';

const ScoresContainer = ({
  nutriScore,
  novaScore,
  iconStyle,
  containerStyle,
}) => {
  // Nova-Score icon:
  const novaIcon = (() => {
    if (novaScore === 'N1') return N1;
    if (novaScore === 'N2') return N2;
    if (novaScore === 'N3') return N3;
    if (novaScore === 'N4') return N4;
    return null;
  })();

  // Nutri-Score icon:
  const nutriIcon = (() => {
    if (nutriScore === 'A') return A;
    if (nutriScore === 'B') return B;
    if (nutriScore === 'C') return C;
    if (nutriScore === 'D') return D;
    if (nutriScore === 'E') return E;
    return null;
  })();

  return (
    <View style={containerStyle}>
      <Image source={novaIcon} style={iconStyle} />
      <Image source={nutriIcon} style={iconStyle} />
    </View>
  );
};

ScoresContainer.propTypes = {
  nutriScore: PropTypes.oneOf(['A', 'B', 'C', 'D', 'E']).isRequired,
  novaScore: PropTypes.oneOf(['N1', 'N2', 'N3', 'N4']).isRequired,
  iconStyle: PropTypes.object.isRequired,
  containerStyle: PropTypes.object.isRequired,
};

export default ScoresContainer;
