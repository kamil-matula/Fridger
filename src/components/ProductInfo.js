import React from 'react';

import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { makeStyles } from 'utils';
import ScoresContainer from './ScoresContainer';

const ProductInfo = ({ text, subtext1, subtext2, nova, nutri }) => {
  const styles = useStyles();

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
      <ScoresContainer
        novaScore={nova}
        nutriScore={nutri}
        containerStyle={styles.imageContainer}
        iconStyle={styles.icon}
      />
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
