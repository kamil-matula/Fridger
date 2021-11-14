/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { View, Text, TextInput } from 'react-native';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';

import {
  Button,
  ScrollViewLayout,
  Separator,
  ShoppingListItemInteractive,
} from 'components';
import { makeStyles } from 'utils';
import { shoppingListItems } from 'tmpData';
import { Divider } from 'react-native-paper';

const YourShoppingList = () => {
  const styles = useStyles();

  const sumList = (sum, val) => ({ price: sum.price + val.price });

  const [mode, setMode] = useState('edit');
  const [isSumOverridden, setSumOverridden] = useState(false);

  // const [unchecked, setUnchecked] = useState(
  //   shoppingListItems.filter((e) => e.status === 'unchecked')
  // );

  // const [indeterminate, setIndeterminate] = useState(
  //   shoppingListItems.filter((e) => e.status === 'indeterminate')
  // );

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      unchecked: shoppingListItems.filter((e) => e.status === 'unchecked'),
      indeterminate: shoppingListItems.filter(
        (e) => e.status === 'indeterminate'
      ),
      summary: shoppingListItems
        .filter((e) => e.status === 'indeterminate')
        .reduce(sumList).price,
    },
  });

  const indet = watch('indeterminate');

  const unchecked = useFieldArray({
    control,
    name: 'unchecked',
  });

  const indeterminate = useFieldArray({
    control,
    name: 'indeterminate',
  });

  return (
    <View style={styles.container}>
      <ScrollViewLayout addPadding={false}>
        <View>
          {unchecked.fields.map((item, index) => (
            <ShoppingListItemInteractive
              key={item.id}
              control={control}
              statusName={`unchecked[${index}].status`}
              priceName={`unchecked[${index}].price`}
              text={item.text}
              subText={item.subText}
              quantity={item.quantity}
              status={item.status}
              price={item.price}
              unit={item.unit}
            />
          ))}
          <Divider style={styles.divider} />
          {indeterminate.fields.map((item, index) => (
            <ShoppingListItemInteractive
              key={item.id}
              control={control}
              statusName={`indeterminate[${index}].status`}
              priceName={`indeterminate[${index}].price`}
              text={item.text}
              subText={`${item.quantity} ${item.unit} • ${item.subText}`}
              quantity={item.quantity}
              status={item.status}
              price={item.price}
              unit={item.unit}
            />
          ))}
          <Separator />
          <View style={styles.summaryContainer}>
            <Text style={styles.total}>TOTAL:</Text>
            <TextInput
              name='summary'
              control={control}
              style={styles.totalPrice}
              keyboardType='numeric'
            />
            <Text style={styles.currency}> zł</Text>
          </View>
          <Separator height={32} />
          <View style={{ alignItems: 'center' }}>
            <Button label='confirm' variant='contained' />
          </View>
          <Separator height={32} />
          <Divider style={styles.divider} />
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
    height: 2,
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
}));

export default YourShoppingList;
