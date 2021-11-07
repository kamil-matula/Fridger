import React from 'react';

import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import { makeStyles } from 'utils';
import { N1, N2, N3, N4, A, B, C, D, E } from 'assets/icons/nova-nutri';

const ProductInfo = ({ text, subtext1, subtext2, nova, nutri }) => {
  const styles = useStyles();

  // Nova-Score icon:
  const novaIcon = (() => {
    if (nova === 'N1') return N1;
    if (nova === 'N2') return N2;
    if (nova === 'N3') return N3;
    if (nova === 'N4') return N4;
    return null;
  })();

  // Nutri-Score icon:
  const nutriIcon = (() => {
    if (nutri === 'A') return A;
    if (nutri === 'B') return B;
    if (nutri === 'C') return C;
    if (nutri === 'D') return D;
    if (nutri === 'E') return E;
    return null;
  })();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
        <Text style={styles.subtext} numberOfLines={1}>
          {subtext1}
        </Text>
        <Text style={styles.subtext} numberOfLines={1}>
          {subtext2}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={novaIcon} style={styles.icon} />
        <Image source={nutriIcon} style={styles.icon} />
      </View>
    </View>
  );
};

ProductInfo.propTypes = {
  text: PropTypes.string.isRequired,
  subtext1: PropTypes.string.isRequired,
  subtext2: PropTypes.string.isRequired,
  nova: PropTypes.string.isRequired,
  nutri: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  textContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: theme.colors.white,
    includeFontPadding: false,
  },
  subtext: {
    fontSize: 14,
    color: theme.colors.silverMetallic,
    includeFontPadding: false,
  },
  imageContainer: {
    marginLeft: 16,
    height: 64,
    width: 64,
    justifyContent: 'space-between',
  },
  icon: {
    height: 30,
    width: 64,
    resizeMode: 'contain',
  },
}));

export default ProductInfo;
