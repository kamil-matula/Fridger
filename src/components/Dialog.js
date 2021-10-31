import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Dialog, Portal, Paragraph } from 'react-native-paper';

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
}) => {
  const styles = useStyles();
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
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{paragraph}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            label={label1}
            color='red'
            variant='text'
            onPress={onPressLabel1}
          />
          <View style={styles.separatorHorizontal8} />
          <Button
            label={label2}
            color='blue'
            variant='text'
            onPress={onPressLabel2}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

DialogBox.propTypes = {
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  visibilityState: PropTypes.array.isRequired,
  label1: PropTypes.string.isRequired,
  onPressLabel1: PropTypes.func.isRequired,
  label2: PropTypes.string.isRequired,
  onPressLabel2: PropTypes.func.isRequired,
};

const useStyles = makeStyles(() => ({
  dialog: {
    elevation: 0,
  },
  separatorHorizontal8: {
    marginHorizontal: 4,
  },
}));

export default DialogBox;
