import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useForm, useFieldArray } from 'react-hook-form';

import { Button, ScrollViewLayout, Separator } from 'components';
import {
  PriceSummaryInteractive,
  ShoppingListItemInteractive,
} from 'components/shoppingLists';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';

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

    if (destination === 'unchecked') {
      unchecked.append(getValues(origin)[idx]);
      indeterminate.remove(idx);
    }
  };

  const uncheckedItems = watch('unchecked');
  const indeterminateItems = watch('indeterminate');
  const sum = sumList(
    indeterminateItems.filter((e) => e.status === 'indeterminate')
  );

  const uncheckedExist = uncheckedItems.length > 0;
  const indeterminateExist = indeterminateItems.length > 0;

  useEffect(() => {
    if (!isSumOverridden) {
      setValue('summary', sum);
    }
  }, [isSumOverridden, setValue, sum]);

  const submit = (data) => {
    // TODO: set status to checked and remove from list
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ScrollViewLayout addPadding={false}>
        <View>
          {unchecked.fields.map((item, index) => (
            <ShoppingListItemInteractive
              key={item.key}
              text={item.name}
              subText={
                item.note
                  ? `${item.quantity} ${item.unit}  •  ${item.note}`
                  : `${item.quantity} ${item.unit}`
              }
              control={control}
              boxName={`unchecked.${index}.price`}
              checkBoxName={`unchecked.${index}.status`}
              setValue={setValue}
              onChangeStatus={() => {
                changePlace(index, 'unchecked', 'indeterminate');
              }}
            />
          ))}
          {uncheckedExist && indeterminateExist && (
            <Divider style={styles.divider} />
          )}
          {indeterminate.fields.map((item, index) => (
            <ShoppingListItemInteractive
              key={item.key}
              text={item.name}
              subText={
                item.note
                  ? `${item.quantity} ${item.unit}  •  ${item.note}`
                  : `${item.quantity} ${item.unit}`
              }
              control={control}
              boxName={`indeterminate.${index}.price`}
              checkBoxName={`indeterminate.${index}.status`}
              setValue={setValue}
              onChangeStatus={() => {
                changePlace(index, 'indeterminate', 'unchecked');
              }}
            />
          ))}
          {indeterminateExist && (
            <>
              <Separator />
              <PriceSummaryInteractive
                control={control}
                name='summary'
                onEndEditing={() => setIsSumOverridden(true)}
                // TODO: Use appropriate currency instead of hardcoded one
                currency='zł'
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
            </>
          )}
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
  reset: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
}));

export default YourShoppingList;
