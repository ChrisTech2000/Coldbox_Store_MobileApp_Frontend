import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

import { Input } from '#ui/components/Input';

import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';
import { useMarketplaceCartStore } from '../store';

type FormValues<T = string> = {
  quantity: T;
};

export default function CartItemInput(props: { itemId: number; initialValue: number }) {
  const { zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: { quantity: props.initialValue.toString() },
    resolver: zodResolver((z) =>
      z.object({ quantity: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0)) })
    ),
    reValidateMode: 'onSubmit',
  });

  function onSubmit(values: FormValues<number>) {
    useMarketplaceCartStore.getState().updateQuantity(props.itemId, values.quantity);
  }

  useEffect(() => {
    // eslint-disable-next-line
    const handler = form.handleSubmit(onSubmit as any);
    const subscription = form.watch(() => handler());
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Controller
      control={form.control}
      name="quantity"
      render={({ field: { value, onChange } }) => (
        <Input
          tw="bg-white border rounded-sm h-12 text-center rounded-md"
          keyboardType="numeric"
          placeholder="0"
          value={value}
          onChangeText={onChange}
          left={
            <TextInput.Icon
              icon="minus"
              color={paperTheme.colors.primary}
              onPress={(evt) => {
                evt.stopPropagation();
                const int = Number(value);
                if (isNaN(int)) return; // safe guard
                onChange((int - 1).toString());
              }}
            />
          }
          right={
            <TextInput.Icon
              icon="plus"
              color={paperTheme.colors.primary}
              onPress={(evt) => {
                evt.stopPropagation();
                const int = Number(value);
                if (isNaN(int)) return; // safe guard
                onChange((int + 1).toString());
              }}
            />
          }
        />
      )}
    />
  );
}
