import React from 'react';

import { View, Text } from 'react-native';
import { Dialog, Portal, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import Button from './Button';

const DialogBox = ({
  title,
  paragraph,
  visibilityState,
  label1 = null,
  onPressLabel1 = null,
  label2 = null,
  onPressLabel2 = null,
  titlePaddingBottom = 16,
  children,
}) => {
  const styles = useStyles({ titlePaddingBottom });
  const [visible, setVisible] = visibilityState;

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
      >
        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Content */}
        {children ?? (
          <Paragraph style={styles.paragraph}>{paragraph}</Paragraph>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.singleButtonContainer}>
            <Button
              label={label1}
              color='red'
              variant='text'
              onPress={onPressLabel1}
            />
          </View>
          <View style={styles.singleButtonContainer}>
            <Button
              label={label2}
              color='blue'
              variant='text'
              onPress={onPressLabel2}
            />
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

DialogBox.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  visibilityState: PropTypes.array.isRequired,
  label1: PropTypes.string.isRequired,
  onPressLabel1: PropTypes.func.isRequired,
  label2: PropTypes.string.isRequired,
  onPressLabel2: PropTypes.func.isRequired,
  titlePaddingBottom: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const useStyles = makeStyles((theme, { titlePaddingBottom }) => ({
  dialog: {
    elevation: 0,
  },
  title: {
    fontSize: 18,
    color: theme.colors.white,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: titlePaddingBottom,
  },
  paragraph: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    fontSize: 14,
  },
  actions: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  singleButtonContainer: {
    width: 80,
    marginRight: 8,
    marginTop: 8,
  },
}));

export default DialogBox;
