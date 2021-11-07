import React, { useState } from 'react';

import { View } from 'react-native';
import { Dialog, Portal, Paragraph } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import Button from './Button';
import RadioButtonGroup from './RadioButtonGroup';
import InputField from './InputField';

const DialogBox = ({
  title,
  paragraph,
  visibilityState,
  label1 = null,
  onPressLabel1 = null,
  label2 = null,
  onPressLabel2 = null,
  quantities,
}) => {
  const styles = useStyles();
  const [visible, setVisible] = visibilityState;

  // Reducing quantity:
  const [checked, setChecked] = useState(null);
  const { control } = useForm({
    defaultValues: {
      quantity: '',
    },
  });

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          {!quantities ? (
            <Paragraph>{paragraph}</Paragraph>
          ) : (
            <>
              <RadioButtonGroup
                items={['eaten', 'wasted', 'disappeared']}
                checkedState={[checked, setChecked]}
              />
              <InputField
                control={control}
                name='quantity'
                returnKeyType='done'
                placeholder='placeholder'
                variant='data'
              />
            </>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <View style={styles.buttonContainer}>
            <Button
              label={label1}
              color='red'
              variant='text'
              onPress={onPressLabel1}
            />
          </View>
          <View style={styles.separatorHorizontal8} />
          <View style={styles.buttonContainer}>
            <Button
              label={label2}
              color='blue'
              variant='text'
              onPress={onPressLabel2}
            />
          </View>
        </Dialog.Actions>
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
  quantities: PropTypes.array,
};

const useStyles = makeStyles(() => ({
  dialog: {
    elevation: 0,
  },
  title: { fontSize: 16 },
  separatorHorizontal8: {
    marginHorizontal: 4,
  },
  buttonContainer: {
    width: 75,
  },
}));

export default DialogBox;
