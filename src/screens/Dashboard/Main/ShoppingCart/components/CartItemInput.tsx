import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

import { Input } from '#ui/components/Input';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';

type FormValues<T = string> = {
  quantity: T;
};

export default function CartItemInput(props: {
  crateId: number;
  initialValue: number;
  availableWeight: number;
}) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const fetchCart = useCartStore((store) => store.fetchCart);

  const [internalValue, setInternalValue] = useState<number>(props.initialValue);

  const form = useForm<FormValues>({
    defaultValues: { quantity: props.initialValue.toString() },
    resolver: zodResolver((z) =>
      z.object({ quantity: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0)) })
    ),
    reValidateMode: 'onSubmit',
  });

  const debouncedSubmit = useMemo(
    () =>
      debounce(async (value: number) => {
        if (value && value !== internalValue) {
          await MarketplaceService.addItemToCart({
            crateId: props.crateId,
            orderedProduceWeight: value,
            updateStrategy: 'replace',
          });

          setInternalValue(value);
          fetchCart();
        }
      }, 500),
    [props.crateId, internalValue]
  );

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'quantity' && value.quantity) {
        debouncedSubmit(Number.parseInt(value.quantity));
      }
    });
    return () => subscription.unsubscribe();
  }, [debouncedSubmit, form.watch]);

  useEffect(() => {
    form.setValue('quantity', props.initialValue.toString());
    setInternalValue(props.initialValue);
  }, [props.initialValue]);

  return (
    <Controller
      control={form.control}
      name="quantity"
      render={({ field: { value, onChange } }) => (
        <Input
          tw="bg-white border rounded-sm h-12 text-center rounded-md"
          keyboardType="numeric"
          placeholder="0"
          value={`${value} kg`}
          editable={false}
          onChangeText={(text) => {
            const newValue = text.replace(' kg', '');
            onChange(newValue);
          }}
          left={
            <TextInput.Icon
              icon="minus"
              disabled={Number(value) - 1 === 0}
              color={paperTheme.colors.primary}
              onPress={(evt) => {
                evt.stopPropagation();
                const int = Number(value);
                if (isNaN(int)) return; // safeguard
                if (int - 1 > 0) {
                  onChange((int - 1).toString());
                } else {
                  toast.show(t('Dashboard.ShoppingCart.errors.invalid'), {
                    type: 'md_danger',
                  });
                }
              }}
            />
          }
          right={
            <TextInput.Icon
              icon="plus"
              disabled={Number(value) + 1 > props.availableWeight}
              color={paperTheme.colors.primary}
              onPress={(evt) => {
                evt.stopPropagation();
                const int = Number(value);
                if (isNaN(int)) return; // safeguard
                if (int + 1 <= props.availableWeight) {
                  onChange((int + 1).toString());
                } else {
                  toast.show(t('Dashboard.ShoppingCart.errors.invalid'), {
                    type: 'md_danger',
                  });
                }
              }}
            />
          }
        />
      )}
    />
  );
}
