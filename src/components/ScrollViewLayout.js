import React from 'react';

import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';

const ScrollViewLayout = ({ children, addPadding = true }) => {
  const styles = useStyles({ addPadding });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.SVcontainer}
        contentContainerStyle={styles.contentContainer}
      >
        {children}
      </ScrollView>
    </View>
  );
};

ScrollViewLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  addPadding: PropTypes.bool,
};

const useStyles = makeStyles((theme, { addPadding }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  SVcontainer: {
    paddingHorizontal: addPadding ? 16 : 0,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

export default ScrollViewLayout;
