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

const ShoppingListYour = () => {
  const styles = useStyles();

  // Calculating total price:
  const sumList = (list) => {
    let sum = 0;
    for (let i = 0; i < list.length; i += 1) sum += parseFloat(list[i].price);
    return sum;
  };

  // Form states:
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

  // Lists with matching states + total price:
  const uncheckedItems = watch('unchecked');
  const indeterminateItems = watch('indeterminate');
  const sum = sumList(indeterminateItems);

  // Function which changes product state:
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

  // Recalculating sum:
  const [isSumOverridden, setIsSumOverridden] = useState(false);
  useEffect(() => {
    if (!isSumOverridden) {
      setValue('summary', sum);
    }
  }, [isSumOverridden, sum]);

  const submit = (data) => {
    // TODO: set status to checked and remove from list
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ScrollViewLayout addPadding={false}>
        <View>
          {/* List of products that can be placed in basket */}
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
              currency='PLN'
            />
          ))}

          {uncheckedItems.length > 0 && indeterminateItems.length > 0 && (
            <Divider style={styles.divider} />
          )}

          {/* List of products that are in basket */}
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
              currency='PLN'
            />
          ))}

          {/* Rendering sum of prices and button only 
              if there are products in the basket */}
          {indeterminateItems.length > 0 && (
            <>
              <Separator />
              {/* Editable sum of prices */}
              <PriceSummaryInteractive
                control={control}
                name='summary'
                onEndEditing={() => setIsSumOverridden(true)}
                currency='PLN'
              />

              {/* Possiblity to recalculate sum */}
              {isSumOverridden ? (
                <View style={styles.reset}>
                  <Button
                    label='reset input override'
                    variant='pureText'
                    onPress={() => {
                      setIsSumOverridden(false);
                    }}
                  />
                </View>
              ) : (
                <Separator height={16} />
              )}
              <Separator height={32} />

              {/* Confirming changes */}
              <View style={{ alignItems: 'center' }}>
                <Button
                  label='confirm'
                  variant='contained'
                  onPress={handleSubmit(submit)}
                />
              </View>
              <Separator height={16} />
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
    margin: 16,
  },
  reset: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
}));

export default ShoppingListYour;
