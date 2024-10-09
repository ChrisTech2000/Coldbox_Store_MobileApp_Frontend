import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';

import type { AvailableListingDatum } from '../utils';
import MarketplaceItemWrapper from './MarketplaceItem';

type FormValues<T = string> = {
  quantity: T;
};

export default function AddToCartModal() {
  const { t, zodResolver } = useTranslationUtils();
  const modalRef = useRef<Modalize>(null);
  const toast = InAppNotifications.useToast();
  const [cartData, fetchCart] = useCartStore((store) => [store.cartData, store.fetchCart]);

  const [datum, setDatum] = useState<AvailableListingDatum | undefined>(undefined);
  useAppEventListener<[AvailableListingDatum]>(
    'DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL',
    (datum) => {
      setDatum(datum);
      modalRef.current?.open();
    }
  );

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
    if (!datum) return;

    const crateAlreadyInCart = cartData?.items?.find((i) => i.relCrateId === datum.crateId);

    await MarketplaceService.addItemToCart({
      crateId: datum.crateId,
      orderedProduceWeight: values.quantity,
      updateStrategy: crateAlreadyInCart ? 'increase' : 'replace',
    });

    fetchCart();
    resetState();
    modalRef.current?.close();
  }

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        onClose={resetState}
        withHandle={false}
        adjustToContentHeight
        modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <View tw="w-full items-center h-auto py-4 px-5 self-center space-y-2">
          <View tw="items-start space-y-1 my-2.5 w-full">
            <Text variant="TitleMedium">{t('Dashboard.Marketplace.addToCart.selectQuantity')}</Text>
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
                        if (datum?.crateWeight && int + 1 <= datum.crateWeight)
                          onChange((int + 1).toString());
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
          </View>
          <View tw="w-full flex-col items-center space-y-2">
            <Button
              tw="w-11/12 mb-4"
              mode="outlined"
              // eslint-disable-next-line
              onPress={form.handleSubmit(onSubmit as any)}
              disabled={form.formState.isSubmitting}
            >
              {t('Dashboard.Marketplace.addToCart.addToCartButton')}
            </Button>
          </View>
        </View>
      </Modalize>
    </Portal>
  );
}
