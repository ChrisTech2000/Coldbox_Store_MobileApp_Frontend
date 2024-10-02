import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';

import { useTranslationUtils } from '#i18n/utils';
import { useAppEventListener } from '#ui/lib/emitter';
import { API_BASE_URL } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';

import MarketplaceItemWrapper from './MarketplaceItem';
import type { AvailableListingDatum } from '../utils';

type FormValues<T = string> = {
  quantity: T;
};

export default function AddToCartModal() {
  const { zodResolver } = useTranslationUtils();

  const [datum, setDatum] = useState<AvailableListingDatum | undefined>(undefined);
  useAppEventListener<[AvailableListingDatum]>('DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL', setDatum);

  const isVisible = typeof datum !== 'undefined';

  const form = useForm<FormValues>({
    defaultValues: { quantity: '1' },
    resolver: zodResolver((z) =>
      z.object({ quantity: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gt(0)) })
    ),
    reValidateMode: 'onSubmit',
  });

  function resetState() {
    setDatum(undefined);
    form.reset({ quantity: '1' });
  }

  async function onSubmit(values: FormValues<number>): Promise<void> {
    // TODO
    console.log(values);
  }

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={resetState}>
        <View tw="w-full items-center bg-zinc-50 rounded-3xl w-11/12 max-w-11/12 h-auto py-4 px-5 self-center space-y-2">
          <View tw="items-start space-y-1 my-2.5 w-full">
            <Text variant="TitleMedium">Select quantity</Text>
            {isVisible ? (
              <MarketplaceItemWrapper shelfLife={datum.shelfLife}>
                <MarketplaceItemWrapper.Body
                  shelfLife={datum.shelfLife}
                  cropName={datum.crop.name}
                  movementCode={datum.movementCode}
                  cropImageUri={`${API_BASE_URL}media/${datum.crop.image}`}
                />
                <MarketplaceItemWrapper.CompanyAction
                  company={datum.company}
                  coolingUnitName={datum.coolingUnit.name}
                  readOnly
                />
                <MarketplaceItemWrapper.BuyAction
                  crateWeight={datum.crateWeight}
                  currencyValue={datum.currencyValue}
                />
              </MarketplaceItemWrapper>
            ) : null}
            <Controller
              control={form.control}
              name="quantity"
              render={({ field: { value, onChange } }) => (
                <Input
                  tw="bg-white border rounded-sm h-14 text-center rounded-md w-full"
                  keyboardType="numeric"
                  defaultValue="1"
                  value={value}
                  onChangeText={onChange}
                  left={
                    <TextInput.Icon
                      icon="minus"
                      color={paperTheme.colors.primary}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        const int = Number(value);
                        if (isNaN(int)) return;
                        const finalValue = (int - 1).toString();
                        onChange(finalValue);
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
                        if (isNaN(int)) return;
                        const finalValue = (int + 1).toString();
                        onChange(finalValue);
                      }}
                    />
                  }
                />
              )}
            />
          </View>
          <View tw="w-full flex-col items-center space-y-2">
            <Button
              tw="w-11/12"
              mode="outlined"
              onPress={(evt) => {
                evt.stopPropagation();
                resetState();
              }}
              disabled={form.formState.isSubmitting}
            >
              Add to cart and continue shopping
            </Button>
            <Button
              tw="w-11/12"
              mode="contained"
              // eslint-disable-next-line
              onPress={form.handleSubmit(onSubmit as any)}
              disabled={form.formState.isSubmitting}
            >
              Buy now
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
