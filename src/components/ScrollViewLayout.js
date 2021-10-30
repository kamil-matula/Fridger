import React from 'react';

import { KeyboardAvoidingView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { makeStyles } from '../utils';

const ScrollViewLayout = ({ children }) => {
  const styles = useStyles();

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ScrollView
        style={styles.SVcontainer}
        contentContainerStyle={styles.contentContainer}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

ScrollViewLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  SVcontainer: {
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

export default ScrollViewLayout;
