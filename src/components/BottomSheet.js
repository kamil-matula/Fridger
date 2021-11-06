import React from 'react';

import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Divider } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

import { makeStyles } from 'utils';
import Separator from './Separator';

const BottomSheet = ({ reference, title, children }) => {
  const styles = useStyles();

  // Height of component depends on number of its children:
  const height = (title ? 56 : 16) + React.Children.count(children) * 56 + 16;

  return (
    <RBSheet
      ref={reference}
      height={height}
      closeOnDragDown
      animationType='fade'
      customStyles={styles}
    >
      {title ? (
        <>
          <Text style={styles.title}>{title}</Text>
          <Divider style={styles.divider} />
        </>
      ) : (
        <Separator />
      )}
      {children}
    </RBSheet>
  );
};

BottomSheet.propTypes = {
  reference: PropTypes.object.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const useStyles = makeStyles((theme) => ({
  title: {
    height: 56,
    paddingHorizontal: 16,
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
  wrapper: {
    backgroundColor: theme.colors.blackSemiTransparent,
  },
  draggableIcon: {
    display: 'none',
  },
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  divider: {
    backgroundColor: theme.colors.white,
  },
}));

export default BottomSheet;
