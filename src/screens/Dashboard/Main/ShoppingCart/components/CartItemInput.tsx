import debounce from 'lodash/debounce';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

import { Input } from '#ui/components/Input';
import { paperTheme } from '#ui/lib/theme';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';

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

  const form = useForm<FormValues>({
    defaultValues: { quantity: props.initialValue.toString() },
    resolver: zodResolver((z) =>
      z.object({ quantity: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0)) })
    ),
    reValidateMode: 'onSubmit',
  });

  const debouncedSubmit = useMemo(
    () =>
      debounce(async (values: FormValues<number>) => {
        if (values.quantity) {
          await MarketplaceService.addItemToCart({
            crateId: props.crateId,
            orderedProduceWeight: values.quantity,
            updateStrategy: 'replace',
          });

          emitter.emit(APP_EVENTS.DISPATCH_CART_REVALIDATION);
        }
      }, 500),
    [props.crateId]
  );

  useEffect(() => {
    // eslint-disable-next-line
    const handler = form.handleSubmit(debouncedSubmit as any);
    const subscription = form.watch(() => handler());
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    form.setValue('quantity', props.initialValue.toString());
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
          value={value}
          onChangeText={(val) => {
            if (!val) {
              onChange(val);
              toast.show(t('Dashboard.ShoppingCart.errors.invalid'), { type: 'md_danger' });
              return;
            }

            const normalizedValue = val.replace(',', '.');
            const floatValue = parseFloat(normalizedValue);

            if (isNaN(floatValue)) return;

            if (floatValue > props.availableWeight) {
              toast.show(t('Dashboard.ShoppingCart.errors.invalid'), { type: 'md_danger' });
              onChange(props.availableWeight);
            } else {
              onChange(normalizedValue);
            }
          }}
          left={
            <TextInput.Icon
              icon="minus"
              color={paperTheme.colors.primary}
              onPress={(evt) => {
                evt.stopPropagation();
                const int = Number(value);
                if (isNaN(int)) return; // safe guard
                if (int - 1 > 0) onChange((int - 1).toString());
                else
                  toast.show(t('Dashboard.ShoppingCart.errors.invalid'), {
                    type: 'md_danger',
                  });
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
                if (int + 1 <= props.availableWeight) onChange((int + 1).toString());
                else
                  toast.show(t('Dashboard.ShoppingCart.errors.invalid'), {
                    type: 'md_danger',
                  });
              }}
            />
          }
        />
      )}
    />
  );
}
