import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import * as BottomSheet from '#ui/components/BottomSheet';

import InAppNotifications from '#common/InAppNotifications';
import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import { cn } from '#ui/lib/cn';
import reportCrash from '#ui/lib/reportCrash';

import type { AvailableListingDatum } from '../utils';
import type { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import MarketplaceItemWrapper from './MarketplaceItem';
import { Checkbox } from '#ui/components/Checkbox';

type FormValues<T = string> = {
  quantity: T;
};

export default function AddToCartModal() {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const navigation = useNavigation<NavigationProp<DashboardMainRoutes>>();

  const [cartData, setCart] = useCartStore((store) => [store.cartData, store.setCart]);
  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  const [datum, setDatum] = useState<AvailableListingDatum | undefined>(undefined);
  const [buyFullCrate, setBuyFullCrate] = useState(false);

  useAppEventListener<[AvailableListingDatum]>(
    APP_EVENTS.DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL,
    (datum) => {
      setDatum(datum);
      modalActions.open();
    }
  );

  const isVisible = typeof datum !== 'undefined';

  const form = useForm<FormValues>({
    defaultValues: { quantity: '1' },
    resolver: zodResolver((z) =>
      z.object({
        quantity: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gt(0)),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  function resetState() {
    setDatum(undefined);
    setBuyFullCrate(false);
    form.reset({ quantity: '1' });
  }

  function buildAddToCartFunc(redirect = false) {
    return async function onSubmit(values: FormValues<number>): Promise<void> {
      if (!datum) return;

      const crateAlreadyInCart = cartData?.items?.find((i) => i.relCrateId === datum.crateId);

      try {
        const result = await MarketplaceService.addItemToCart({
          crateId: datum.crateId,
          orderedProduceWeight: values.quantity,
          updateStrategy: crateAlreadyInCart ? 'increase' : 'replace',
        });

        setCart(result.cart);
        resetState();
        modalActions.close();
        if (redirect) {
          navigation.navigate('ShoppingCart', { screen: 'Root' });
        }
      } catch (exception) {
        reportCrash(exception as Error);
      }
    };
  }

  return (
    <BottomSheet.Root ref={modalRef} onClose={resetState}>
      <BottomSheet.Content tw="w-full items-center h-auto self-center space-y-2">
        <View tw="items-start space-y-1 my-2.5 w-full">
          <Text variant="TitleMedium">{t('Dashboard.Marketplace.addToCart.selectQuantity')}</Text>
          {isVisible ? (
            <MarketplaceItemWrapper shelfLife={datum.shelfLife}>
              <MarketplaceItemWrapper.Body
                shelfLife={datum.shelfLife}
                cropName={datum.crop.name}
                movementCode={datum.movementCode}
                owner={datum.owner}
                cropImageUri={`${API_BASE_URL}media/${datum.crop.image}`}
                produceInfo={datum.produceInfo}
              />
              <MarketplaceItemWrapper.CompanyAction
                company={datum.company}
                coolingUnit={datum.coolingUnit.name}
                readOnly
              />
              <MarketplaceItemWrapper.BuyAction
                crateWeight={datum.crateWeight}
                currencyValue={datum.currencyValue}
                standardWeight={datum.coolingUnit.standardWeight}
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
                value={`${value} kg`}
                editable={false}
                disabled={buyFullCrate || form.formState.isSubmitting}
                onChangeText={(text) => {
                  const newValue = text.replace(' kg', '');
                  onChange(newValue);
                }}
                left={
                  <TextInput.Icon
                    icon="minus"
                    color={paperTheme.colors.primary}
                    disabled={
                      Number(value) - 1 === 0 || buyFullCrate || form.formState.isSubmitting
                    }
                    onPress={(evt) => {
                      evt.stopPropagation();
                      const int = Number(value);
                      if (isNaN(int)) return;
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
                    disabled={
                      (datum && Number(value) + 1 > datum.crateWeight) ||
                      buyFullCrate ||
                      form.formState.isSubmitting
                    }
                    color={paperTheme.colors.primary}
                    onPress={(evt) => {
                      evt.stopPropagation();
                      const int = Number(value);
                      if (isNaN(int)) return;
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
          <Touchable
            tw="flex flex-row items-center max-w-[75%] py-2 space-x-2"
            onPress={() => {
              setBuyFullCrate(!buyFullCrate);
              if (!buyFullCrate) form.setValue('quantity', datum?.crateWeight.toString() || '1');
            }}
            disabled={form.formState.isSubmitting}
          >
            <Checkbox
              status={buyFullCrate ? 'checked' : 'unchecked'}
              disabled={form.formState.isSubmitting}
            />
            <Text tw={cn('text-base', form.formState.isSubmitting && 'text-zinc-500')}>
              {t('Dashboard.Marketplace.addToCart.buyFullCrate')}
            </Text>
          </Touchable>
        </View>
        <View tw="w-full flex-col items-center space-y-3 mb-4">
          <Button
            tw="w-11/12"
            mode="contained"
            // eslint-disable-next-line
            onPress={form.handleSubmit(buildAddToCartFunc() as any)}
            disabled={form.formState.isSubmitting}
          >
            {t('Dashboard.Marketplace.addToCart.addToCartButton')}
          </Button>
          <Button
            tw="w-11/12"
            mode="outlined"
            // eslint-disable-next-line
            onPress={form.handleSubmit(buildAddToCartFunc(true) as any)}
            disabled={form.formState.isSubmitting}
          >
            {t('Dashboard.Marketplace.addToCart.goToCart')}
          </Button>
        </View>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
}
