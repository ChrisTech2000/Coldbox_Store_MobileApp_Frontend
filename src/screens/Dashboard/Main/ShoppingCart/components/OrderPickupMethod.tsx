import { CurrencyStandardization } from 'currency-format-utils';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Divider, IconButton, Portal, RadioButton } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import { GetCartResponse } from '#types/api.responses';
import { EPickUpMethod, EPricingType } from '#types/global';

type OrderPickupMethodProps = {
  coolingUnitsIds: number[];
};

export default function OrderPickupMethod({ coolingUnitsIds }: OrderPickupMethodProps) {
  const { t } = useTranslationUtils();
  const [cartData, allCoolingUnits, setCart] = useCartStore((store) => [
    store.cartData,
    store.allCoolingUnits,
    store.setCart,
  ]);
  const colors = useTailwindColors();
  const modalRef = useRef<Modalize>(null);
  const toast = InAppNotifications.useToast();

  const [selectedItems, setSelectedItems] = useState<GetCartResponse['pickupDetails'] | undefined>(
    cartData?.pickupDetails
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const coolingUnits = useMemo(() => {
    return allCoolingUnits?.filter((cu) => coolingUnitsIds?.includes(cu.id));
  }, [coolingUnitsIds, allCoolingUnits]);

  const handleValueChange = useCallback((coolingUnitId: number, value: EPickUpMethod) => {
    setSelectedItems((prev) => {
      const updatedItems = (prev ?? []).map((item) =>
        item.coolingUnitId === coolingUnitId ? { ...item, pickupMethod: value } : item
      );

      if (!updatedItems.find((item) => item.coolingUnitId === coolingUnitId)) {
        updatedItems.push({ coolingUnitId, pickupMethod: value });
      }

      return updatedItems;
    });
  }, []);

  const onConfirm = useCallback(async () => {
    if (!selectedItems) return modalRef.current?.close();

    try {
      setIsSubmitting(true);
      const result = await MarketplaceService.setPickUpMethods({
        pickUpDetails: selectedItems,
      });

      if (result) {
        setCart(result.cart);
        setIsSubmitting(false);
        modalRef.current?.close();
        toast.show(t('actions.done'), {
          type: 'md_success',
        });
      }
    } catch (error) {
      toast.show(t('navigation.error.errorMessage'), {
        type: 'md_danger',
      });
    }
  }, [selectedItems]);

  return (
    <React.Fragment>
      <View tw="flex flex-row items-center">
        <Text tw="text-base text-green-primary font-bold">
          {t('Dashboard.ShoppingCart.pickupMethods')}*
        </Text>
        <IconButton
          tw="p-0 m-0"
          icon={
            cartData?.pickupDetails && cartData.pickupDetails.length > 0
              ? 'pencil'
              : 'plus-circle-outline'
          }
          size={17}
          iconColor={colors.green.primary}
          containerColor={colors.transparent}
          onPress={(evt) => {
            evt.stopPropagation();
            modalRef.current?.open();
          }}
        />
      </View>

      <Portal>
        <Modalize
          ref={modalRef}
          modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
          adjustToContentHeight
          withHandle={false}
        >
          <View tw="w-full items-center justify-center h-10">
            <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
          </View>

          <FlatList
            data={coolingUnits}
            keyExtractor={(item, index) => `${item}-${index}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: coolingUnit }) => (
              <View tw="px-4 py-2 mb-4">
                <Text tw="text-base mb-2">{coolingUnit.name}</Text>
                <View tw="flex-col border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
                  <RadioButton.Group
                    value={
                      selectedItems?.find((item) => item.coolingUnitId === coolingUnit.id)
                        ?.pickupMethod ?? ''
                    }
                    onValueChange={(value) =>
                      handleValueChange(coolingUnit.id, value as EPickUpMethod)
                    }
                  >
                    <RadioButtonItem
                      label={t('Dashboard.ShoppingCart.pickUpToday')}
                      value={EPickUpMethod.PICK_UP_SAME_DAY}
                      tw="flex flex-row-reverse ml-[-10] w-full"
                    />
                    <Divider tw="bg-zinc-400" />
                    <RadioButtonItem
                      label={t(
                        coolingUnit.commonPricingType.type === EPricingType.PERIODICITY
                          ? 'Dashboard.ShoppingCart.keepInStorageDailyRate'
                          : 'Dashboard.ShoppingCart.keepInStorageFixedRate',
                        {
                          price: CurrencyStandardization.currencyCode({
                            code: 'NGN', // TODO: get value from somewhere
                            value: coolingUnit.commonPricingType.value,
                          }).getValueFormated(),
                        }
                      )}
                      value={EPickUpMethod.KEEP_IN_STORAGE}
                      tw="flex flex-row-reverse ml-[-10] w-full"
                    />
                    <Divider tw="bg-zinc-400" />
                    <View tw="flex-row items-center justify-between">
                      <RadioButtonItem
                        label={t('Dashboard.ShoppingCart.delivery')}
                        value={EPickUpMethod.DELIVERY}
                        tw="flex flex-row-reverse ml-[-10] w-full"
                      />
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            )}
          />

          <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300 mb-4">
            <Button
              mode="contained"
              tw="w-5/6"
              onPress={onConfirm}
              disabled={
                !selectedItems || (coolingUnits && selectedItems.length < coolingUnits.length)
              }
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                t('actions.confirm')
              )}
            </Button>
          </View>
        </Modalize>
      </Portal>
    </React.Fragment>
  );
}
