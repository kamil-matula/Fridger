import React from 'react';

import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';

const ScrollViewLayout = ({ children }) => {
  const styles = useStyles();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {children}
    </ScrollView>
  );
};

ScrollViewLayout.propTypes = {
  children: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

export default ScrollViewLayout;
