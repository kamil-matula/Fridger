import React from 'react';

import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

import { makeStyles } from 'utils';
import Separator from './Separator';

const BottomSheet = ({ reference, title, isFridgeName = false, children }) => {
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
          {!isFridgeName ? (
            <>
              <Text style={styles.title}>{title}</Text>
              <Divider />
            </>
          ) : (
            <>
              <View style={styles.fridgeNameContainer}>
                <Text style={styles.fridgeName1}>Connected to:</Text>
                <Text numberOfLines={1} style={styles.fridgeName2}>
                  {title}
                </Text>
                <Divider />
              </View>
            </>
          )}
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
  isFridgeName: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const useStyles = makeStyles((theme) => ({
  title: {
    height: 56,
    paddingHorizontal: 16,
    lineHeight: 56,
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
  fridgeNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  fridgeName1: {
    color: theme.colors.white,
  },
  fridgeName2: {
    color: theme.colors.white,
    fontSize: 16,
    marginHorizontal: 16,
  },
}));

export default BottomSheet;
