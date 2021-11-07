import React from 'react';

import { View } from 'react-native';
import { Dialog, Portal, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';

import { makeStyles } from 'utils';
import Button from './Button';
import RadioButtonGroup from './RadioButtonGroup';
import InputField from './InputField';
import Separator from './Separator';

const DialogBox = ({
  title,
  paragraph,
  visibilityState,
  label1 = null,
  onPressLabel1 = null,
  label2 = null,
  onPressLabel2 = null,
  control,
  checkedState,
  reduceQuantityItem,
  dialogHeight,
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
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>

        {/* Question or radio buttons with input field */}
        <Dialog.Content height={dialogHeight}>
          {!reduceQuantityItem ? (
            <Paragraph>{paragraph}</Paragraph>
          ) : (
            <>
              <RadioButtonGroup
                items={['eaten', 'wasted', 'disappeared']}
                checkedState={checkedState}
              />
              <Separator />
              <InputField
                control={control}
                name='quantity'
                returnKeyType='done'
                variant='quantity'
                postfix={`/ ${reduceQuantityItem.maxQuantity} ${reduceQuantityItem.quantityType}`}
                keyboardType='numeric'
                textAlign='right'
              />
            </>
          )}
        </Dialog.Content>

        {/* Buttons */}
        <Dialog.Actions style={{ margin: 0, padding: 0 }}>
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
  // Main properties
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string,
  visibilityState: PropTypes.array.isRequired,
  label1: PropTypes.string.isRequired,
  onPressLabel1: PropTypes.func.isRequired,
  label2: PropTypes.string.isRequired,
  onPressLabel2: PropTypes.func.isRequired,

  // Properties needed in ReduceQuantity dialog:
  control: PropTypes.object,
  checkedState: PropTypes.array,
  reduceQuantityItem: PropTypes.object,
  dialogHeight: PropTypes.number,
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
