import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Dialog, Divider, Portal, RadioButton } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialIcons';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import type { CartDatumGetCartResponse } from '#types/api.responses';
import { type CoolingUnit, EPickUpMethod, EPricingType } from '#types/global';

import { formatCurrencyWithSymbol } from '../../Dashboard/CheckIn/utils';

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

const MODAL_MAX_HEIGHT = Dimensions.get('window').height * 0.68;

export default function OrderPickupMethod({ data }: OrderPickupMethodProps) {
  const { t } = useTranslationUtils();
  const [cartData, allCoolingUnits, setCart] = useCartStore((store) => [
    store.cartData,
    store.allCoolingUnits,
    store.setCart,
  ]);
  const modalRef = useRef<Modalize>(null);
  const toast = InAppNotifications.useToast();

  const [selectedItems, setSelectedItems] = useState<
    CartDatumGetCartResponse['pickupDetails'] | undefined
  >(cartData?.pickupDetails);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activePickupModal, setActivePickupModal] = useState<
    [CoolingUnit, PickUpMethod] | undefined
  >();

  const coolingUnits = useMemo(() => {
    return allCoolingUnits?.filter((cu) => data?.map((el) => el.unit).includes(cu?.id));
  }, [data, allCoolingUnits]);

  const coolingUnitsWithoutPickupMethod = useMemo(() => {
    if (!coolingUnits || !cartData) return;
    if (!cartData?.pickupDetails?.length) return coolingUnits.length;
    return coolingUnits.length - cartData.pickupDetails.length;
  }, [cartData, coolingUnits]);

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
        modalRef.current?.close();
        toast.show(t('actions.done'), { type: 'md_success' });
      }
    } catch (error) {
      toast.show(t('navigation.error.serverErrorMessage'), {
        type: 'md_danger',
      });
      reportCrash(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedItems]);

  useAppEventListener(APP_EVENTS.DISPATCH_PICK_UP_METHODS_SELECTION, () =>
    modalRef.current?.open()
  );

  return (
    <React.Fragment>
      <Text tw="text-base text-green-primary font-bold mr-1">
        {t('Dashboard.ShoppingCart.pickupMethods')}*
      </Text>
      {coolingUnitsWithoutPickupMethod ? (
        <View>
          <Text tw="text-red-700">
            {coolingUnitsWithoutPickupMethod === coolingUnits?.length
              ? t('Dashboard.ShoppingCart.selectPickupMethodInfo')
              : t('Dashboard.ShoppingCart.pickupMethodSelectionMissing', {
                  amount: coolingUnitsWithoutPickupMethod,
                })}
          </Text>
          <Button
            tw="w-5/6 self-center my-4"
            mode="contained"
            uppercase
            onPress={(evt) => {
              evt.stopPropagation();
              modalRef.current?.open();
            }}
          >
            {t('Dashboard.ShoppingCart.selectPickupMethod')}
          </Button>
        </View>
      ) : null}

      <Portal>
        <Modalize
          ref={modalRef}
          modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32, overflow: 'hidden' }}
          {...(coolingUnits && coolingUnits?.length < 2
            ? { adjustToContentHeight: true }
            : { modalHeight: MODAL_MAX_HEIGHT })}
          withHandle={false}
          avoidKeyboardLikeIOS
        >
          <View tw="w-full items-center justify-center h-10">
            <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
          </View>

          <View tw="flex-1">
            <FlatList
              data={coolingUnits}
              keyExtractor={(item, index) => `${item}-${index}`}
              scrollEnabled={true}
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
                            price: formatCurrencyWithSymbol(
                              DEFAULT_CURRENCY_CODE,
                              coolingUnit.commonPricingType?.value
                            ),
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
                  !selectedItems ||
                  (coolingUnits && selectedItems.length < coolingUnits.length) ||
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  t('actions.confirm')
                )}
              </Button>
            </View>
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

  const { data, isLoading } = useApiCall(
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

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={close} style={{ backgroundColor: 'white' }}>
        <Dialog.Icon
          icon={() => (
            <MaterialCommunityIcon name="location-on" size={45} color={colors.green.primary} />
          )}
        />
        <Dialog.Content>
          {isLoading ? (
            <ActivityIndicator tw="mt-1" size={18} color={paperTheme.colors.backdrop} animating />
          ) : (
            <Text tw="text-base text-center mt-4">
              {t(`Dashboard.ShoppingCart.pickupModal.${version}`, {
                company: cu?.name,
                location: `${data.street ? data.street + ' ' : ''}${data.streetNumber ? data.streetNumber + ', ' : ''} ${data.city}${data.latitude ? ` (${data.latitude}, ${data.longitude})` : ''}`,
              })}
            </Text>
          )}
          {version === EPickUpMethod.DELIVERY ? (
            <Text tw="mt-2 text-center text-gray-500">
              {t('Dashboard.ShoppingCart.deliveryInfo', {
                value: formatCurrencyWithSymbol(
                  DEFAULT_CURRENCY_CODE,
                  cu?.commonPricingType?.value ?? 0
                ),
              })}
            </Text>
          ) : null}
          <Button mode="outlined" tw="border border-green-primary mt-6" onPress={close}>
            {t('Dashboard.ShoppingCart.gotItButton')}
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
