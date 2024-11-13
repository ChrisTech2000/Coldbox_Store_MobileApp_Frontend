import { CurrencyStandardization } from 'currency-format-utils';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Divider, Icon, Portal, RadioButton } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialIcons';
import { addDays } from 'date-fns';

import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import InAppNotifications from '#common/InAppNotifications';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import { GetCartResponse } from '#types/api.responses';
import { CoolingUnit, EPickUpMethod, EPricingType } from '#types/global';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

type OrderPickupMethodProps = {
  data: Array<{ unit: number; company: number }>;
};

type PickupModalModalProps = {
  isVisible: boolean;
  close: () => void;
  version: PickUpMethod;
  cu: CoolingUnit;
  companyId: number;
};

type PickUpMethod = 'delivery' | 'today' | 'storage';

export default function OrderPickupMethod({ data }: OrderPickupMethodProps) {
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
  const [activePickupModal, setActivePickupModal] = useState<
    [CoolingUnit, PickUpMethod] | undefined
  >();

  const coolingUnits = useMemo(() => {
    return allCoolingUnits?.filter((cu) => data?.map((el) => el.unit).includes(cu?.id));
  }, [data, allCoolingUnits]);

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
        pickupDetails: selectedItems,
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
      setIsSubmitting(false);
      toast.show(t('navigation.error.errorMessage'), {
        type: 'md_danger',
      });
    }
  }, [selectedItems]);

  useAppEventListener(APP_EVENTS.DISPATCH_PICK_UP_METHODS_SELECTION, () =>
    modalRef.current?.open()
  );

  return (
    <React.Fragment>
      <View tw="flex flex-row items-center">
        <TouchableOpacity
          onPress={(evt) => {
            evt.stopPropagation();
            modalRef.current?.open();
          }}
          disabled={cartData?.pickupDetails && cartData.pickupDetails.length > 0}
          tw="flex flex-row items-center"
        >
          <Text tw="text-base text-green-primary font-bold mr-1">
            {t('Dashboard.ShoppingCart.pickupMethods')}*
          </Text>
          {!cartData?.pickupDetails || cartData.pickupDetails.length === 0 ? (
            <Icon source="plus-circle-outline" size={17} color={colors.green.primary} />
          ) : null}
        </TouchableOpacity>
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
                    onValueChange={(value) => {
                      handleValueChange(coolingUnit.id, value as EPickUpMethod);
                      setActivePickupModal([
                        coolingUnit,
                        value === EPickUpMethod.PICK_UP_SAME_DAY
                          ? 'today'
                          : value === EPickUpMethod.KEEP_IN_STORAGE
                            ? 'storage'
                            : 'delivery',
                      ]);
                    }}
                  >
                    <RadioButtonItem
                      label={t('Dashboard.ShoppingCart.pickUpToday')}
                      value={EPickUpMethod.PICK_UP_SAME_DAY}
                      tw="flex flex-row-reverse ml-[-10] w-full"
                    />
                    <Divider tw="bg-zinc-400" />
                    <RadioButtonItem
                      label={t(
                        coolingUnit.commonPricingType?.type === EPricingType.PERIODICITY
                          ? 'Dashboard.ShoppingCart.keepInStorageDailyRate'
                          : 'Dashboard.ShoppingCart.keepInStorageFixedRate',
                        {
                          price: CurrencyStandardization.currencyCode({
                            code: 'NGN', // TODO: get value from somewhere
                            value: coolingUnit.commonPricingType?.value,
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

      <PickupModalModal
        isVisible={!!activePickupModal}
        version={activePickupModal?.[1] as PickUpMethod}
        close={() => setActivePickupModal(undefined)}
        cu={activePickupModal?.[0] as CoolingUnit}
        companyId={data?.filter((el) => el.unit === activePickupModal?.[0].id)?.[0]?.company}
      />
    </React.Fragment>
  );
}

function PickupModalModal({ isVisible, close, version, cu, companyId }: PickupModalModalProps) {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const items = useCartStore((store) =>
    store.cartData?.items?.filter((item) => item.relCoolingUnitId === cu?.id)
  );

  const { data } = useApiCall(
    'getLocation',
    ColdtivateService.getLocation,
    {
      companyId: companyId,
      locationId: cu?.location,
    },
    {
      skip: !companyId || !cu,
      defaultData: undefined,
    }
  );

  const { data: company } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    companyId as number,
    {
      skip: !companyId,
      defaultData: undefined,
    }
  );

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={close}>
        <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto py-6 px-5 self-center">
          <MaterialCommunityIcon name="location-on" size={45} color={colors.green.primary} />

          <Text tw="text-base text-center mt-4 mb-6">
            {t(`Dashboard.ShoppingCart.pickupModal.${version}`, {
              company: company.name,
              location: data.city,
              ttpu:
                items && items.length > 0
                  ? dateFmt(
                      addDays(
                        new Date(),
                        Math.min(...items.map((item) => item.relCrateRemainingShelfLife ?? 0))
                      ).toISOString(),
                      'MMMM d'
                    )
                  : '', // TODO: I'm using the lowest TTPU here, but this needs to be confirmed
            })}
          </Text>

          <Button mode="outlined" tw="border border-green-primary" onPress={close}>
            {t('Dashboard.ShoppingCart.gotItButton')}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
