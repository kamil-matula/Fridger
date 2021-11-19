/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { useForm, useFieldArray } from 'react-hook-form';

import {
  Button,
  PriceSummaryInteractive,
  ScrollViewLayout,
  Separator,
  ShoppingListItemInteractive,
} from 'components';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';
import { Divider } from 'react-native-paper';

const YourShoppingList = () => {
  const styles = useStyles();

  const sumList = (list) => {
    let sum = 0;
    for (let i = 0; i < list.length; i += 1) {
      sum += parseFloat(list[i].price);
    }
    return sum;
  };

  const [isSumOverridden, setIsSumOverridden] = useState(false);

  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      unchecked: shoppingListItems.filter((e) => e.status === 'unchecked'),
      indeterminate: shoppingListItems.filter(
        (e) => e.status === 'indeterminate'
      ),
      summary: sumList(
        shoppingListItems.filter((e) => e.status === 'indeterminate')
      ),
    },
  });

  const unchecked = useFieldArray({
    control,
    name: 'unchecked',
    keyName: 'key',
  });

  const indeterminate = useFieldArray({
    control,
    name: 'indeterminate',
    keyName: 'key',
  });

  const changePlace = (idx, origin, destination) => {
    if (destination === 'indeterminate') {
      indeterminate.prepend(getValues(origin)[idx]);
      unchecked.remove(idx);
    }
    // TODO: fix bug
    // empty elements are created
    // focus kick in when element added
    if (destination === 'unchecked') {
      unchecked.prepend(getValues(origin)[idx]);
      indeterminate.remove(idx);
    }
  };

  const uncheckedItems = watch('unchecked');
  const indeterminateItems = watch('indeterminate');
  const sum = sumList(
    indeterminateItems.filter((e) => e.status === 'indeterminate')
  );

  useEffect(() => {
    if (!isSumOverridden) {
      setValue('summary', sum);
    }
  }, [isSumOverridden, setValue, sum]);

  const submit = (data) => {
    // TODO: set status to checked and remove from list
  };

  return (
    <View style={styles.container}>
      <ScrollViewLayout addPadding={false}>
        <View>
          {unchecked.fields.map((item, index) => (
            <ShoppingListItemInteractive
              key={item.key}
              text={item.text}
              subText={`${item.subText}`}
              boxText={`${item.quantity} ${item.unit}`}
              control={control}
              boxName={`unchecked.${index}.price`}
              checkBoxName={`unchecked.${index}.status`}
              setValue={setValue}
              onChangeStatus={() => {
                changePlace(index, 'unchecked', 'indeterminate');
              }}
            />
          ))}
          {uncheckedItems.length > 0 && <Divider style={styles.divider} />}
          {indeterminate.fields.map((item, index) => (
            <ShoppingListItemInteractive
              key={item.key}
              text={item.text}
              subText={`${item.quantity} ${item.unit} • ${item.subText}`}
              control={control}
              boxName={`indeterminate.${index}.price`}
              checkBoxName={`indeterminate.${index}.status`}
              setValue={setValue}
              onChangeStatus={() => {
                changePlace(index, 'indeterminate', 'unchecked');
              }}
            />
          ))}
          <Separator />
          <PriceSummaryInteractive
            control={control}
            name='summary'
            onEndEditing={() => setIsSumOverridden(true)}
          />
          {isSumOverridden && (
            <View style={styles.reset}>
              <Button
                label='reset input override'
                variant='pureText'
                onPress={() => {
                  setIsSumOverridden(false);
                }}
              />
            </View>
          )}
          <Separator height={32} />
          <View style={{ alignItems: 'center' }}>
            <Button
              label='confirm'
              variant='contained'
              onPress={handleSubmit(submit)}
            />
          </View>
          <Separator height={32} />
        </View>
      </ScrollViewLayout>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  divider: {
    backgroundColor: theme.colors.silverMetallic,
    margin: 16,
  },
  summaryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.silverMetallic,
  },
  totalPrice: {
    flex: 1,
    paddingBottom: 0,
    fontSize: 24,
    color: theme.colors.white,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.silverMetallic,
  },
  currency: {
    paddingRight: 16,
    paddingBottom: 0,
    fontSize: 24,
    color: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.silverMetallic,
  },
  reset: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
}));

export default YourShoppingList;
