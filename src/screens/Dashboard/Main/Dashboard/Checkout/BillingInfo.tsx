import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator, Divider, Icon, Switch } from 'react-native-paper';
import cloneDeep from 'lodash/cloneDeep';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { TemperatureAlertEvtDatum } from '#navigation/Dashboard/components/TemperatureAlert';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckOutStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { EPaymentMethod, EPaymentThrough, EPricingType } from '#types/global';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { CheckOut2ScreenOverlay } from '#screens/Dashboard/Tutorial/CheckoutOverlays';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Input } from '#ui/components/Input';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';

import { useMarketplaceListing } from '../../Marketplace/utils';
import { BankTransferModal } from './BankTransferDetailsModal';

const DEVICE_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = (DEVICE_WIDTH - 42) / 2;

export const usePaymentTypeStore = createSelectStore<EPaymentMethod>();

function BillingInfo({ route, navigation }: CheckOutStackRouteProps<'BillingInfo'>) {
  const { user, crates: datums, coolingUnit } = route.params;

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();

  const company = useManagementStore((store) => store.company);
  const { refetch: refetchMarketplace } = useMarketplaceListing();
  const [paymentMethod, resetPaymentStore] = usePaymentTypeStore((store) => [
    store.selectedItem,
    store.reset,
  ]);
  const refreshData = useDashboardStore((store) => store.refreshData);

  const [discount, setDiscount] = useState<string>('');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState<boolean>(false);
  const [isBankTransferDetailsModalOpen, setIsBankTransferDetailsModalOpen] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>();

  useWalkthroughStep({
    number: EOperatorTutorialSteps.CHECK_OUT_STEP_3,
    OverlayComponent: CheckOut2ScreenOverlay,
    fullScreen: true,
  });

  const locale = LanguageManager.read();

  const crates = useMemo(() => {
    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();
    return cloneDeep(datums || []).map((datum) => ({
      ...datum,
      name: find(translationMap, {
        name: datum.name,
        country: company?.country,
        locale,
      }),
    }));
  }, [datums, company?.country, locale]);

  const { data: locations } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id ?? 0,
    {
      skip: !coolingUnit?.id,
    }
  );

  const currency = useMemo(() => {
    return locations?.[0]?.company.currency ?? '';
  }, [locations]);

  const totalWeight = useMemo(() => {
    return crates?.reduce((acc, current) => {
      return (acc += current.weight);
    }, 0);
  }, [crates]);

  const priceType = useMemo(() => {
    const type = coolingUnit?.commonPricingType?.type;
    const price = coolingUnit?.commonPricingType?.value;
    return type === EPricingType.PERIODICITY
      ? `${price}${currency} / ${t('Dashboard.CrateManagement.CheckOut.crate')} / ${t('Dashboard.CrateManagement.CheckOut.day')}`
      : price;
  }, [coolingUnit, currency]);

  const cratePrices = useMemo(() => {
    const type = coolingUnit?.commonPricingType?.type;
    const price = coolingUnit?.commonPricingType?.value;

    return (crates ?? []).map((crate) => {
      const isMarketplaceOrder = crate.movementCode.startsWith('MO-#');
      const checkinDate = new Date(crate.checkinDate);
      const today = new Date();

      checkinDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (isMarketplaceOrder && checkinDate.getTime() === today.getTime()) {
        return 0;
      }

      if (!crate.initialWeight) {
        return 0;
      }

      const deductibleFees =
        crate.weight === crate.initialWeight ? 1 : crate.weight / crate.initialWeight;

      return (
        (type === EPricingType.PERIODICITY
          ? (price ?? 0) * crate.currentStorageDays
          : (price ?? 0)) * deductibleFees
      );
    });
  }, [coolingUnit, crates]);

  const total = useMemo(() => {
    return cratePrices?.reduce((acc: number, current) => (acc += current ?? 0), 0) ?? 0;
  }, [cratePrices]);

  const paymentMethodLabel = useMemo(() => {
    if (!paymentMethod) return '';
    return paymentMethod === EPaymentMethod.CASH
      ? t('Dashboard.CrateManagement.CheckOut.paymentType.cash')
      : paymentMethod === EPaymentMethod.CREDIT_CARD
        ? t('Dashboard.CrateManagement.CheckOut.paymentType.creditCard')
        : t('Dashboard.CrateManagement.CheckOut.paymentType.bankTransfer');
  }, [paymentMethod]);

  const checkout = useCallback(async () => {
    try {
      setIsSubmitting(true);

      const dInt = Number(discount);
      if (!crates || isNaN(dInt) || !coolingUnit?.id || !company?.id) throw new Error();

      await ColdtivateService.checkOut({
        crates: crates?.map((crate) => crate.id),
        discountAmount: dInt,
        currency: currency,
        paymentThrough: EPaymentThrough.DIRECT,
        paymentGateway: null,
        paymentMethod: paymentMethod as EPaymentMethod,
        paid: isPaid,
      });

      refreshData.forEach((fn) => fn());
      refetchMarketplace();
      toast.show(t('actions.update-success'), { type: 'md_success' });

      if (guard('VIEW', 'TemperatureAlertModal')) {
        const temperatureAlertDatum = {
          coolingUnitId: coolingUnit.id,
          companyId: company.id,
          showCompleteInfo: true,
        } satisfies TemperatureAlertEvtDatum;

        emitter.emit(APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT, temperatureAlertDatum);
      }

      rootNavigation.navigate('RootMainTabStack');
      setIsSubmitting(false);
    } catch (exception) {
      toast.show(t('Dashboard.CrateManagement.operationError'), {
        type: 'md_danger',
      });
      reportCrash(exception as Error);
      setIsSubmitting(false);
    }
  }, [crates, discount, currency, paymentMethod, isPaid, refreshData, guard, coolingUnit?.id]);

  useEffect(() => {
    return () => resetPaymentStore();
  }, []);

  const finalPrice = total - (isNaN(Number(discount)) ? 0 : Math.min(Number(discount), total));

  return (
    <View tw="flex-1">
      <KeyboardAwareScrollView
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        contentContainerStyle="px-4 pb-20"
      >
        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.coolingUserLabel')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {user}
          </Text>
        </View>
        <Divider tw="bg-gray-400 my-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.numberOfCrates')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {crates?.length}
          </Text>
        </View>
        <Divider tw="bg-gray-400 my-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.totalWeight')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {totalWeight} {t('Dashboard.ProduceDetails.kilogram')}
          </Text>
        </View>
        <Divider tw="bg-gray-400 mt-2 mb-10" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.priceType')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {priceType}
          </Text>
        </View>
        <Divider tw="bg-gray-400 my-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.pricePerProduct')}
          </Text>
          <Text variant="TextMedium" tw="text-lg text-gray-400">
            {currency}
          </Text>
        </View>
        <Divider tw="bg-gray-400 my-2" />

        <View style={{ height: 200 }}>
          <FlashList
            data={crates}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            keyExtractor={(item, index) => `billing-crate-${item.id}-${index}`}
            renderItem={({ item: crate, index }) => (
              <View tw="flex flex-row flex-wrap items-center justify-between py-1">
                <View tw="flex flex-row space-x-1 items-center">
                  <Icon source="circle-medium" size={20} />
                  <Text variant="TextMedium" tw="text-lg">
                    {`${crate.name} (${crate.tag ?? ''}) — ${crate.weight}${t('Dashboard.ProduceDetails.kilogram')}/${crate.currentStorageDays} ${t('Dashboard.CrateManagement.CheckOut.days')}`}
                  </Text>
                </View>

                <Text variant="TextMedium" tw="text-lg pl-2">
                  {(cratePrices?.[index] ?? 0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: company?.currency,
                  })}
                </Text>
              </View>
            )}
            estimatedItemSize={50}
          />
        </View>
        <Divider tw="bg-gray-400 my-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.calculatedPrice')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {total.toLocaleString('en-US', {
              style: 'currency',
              currency: company?.currency,
            })}
          </Text>
        </View>
        <Divider tw="bg-gray-400 mt-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.discount')}
          </Text>
          <View tw="flex flex-row items-center space-x-1">
            <Input
              tw="bg-gray-100 rounded-sm mt-2 mb-3 h-7 w-24"
              keyboardType="numeric"
              onChangeText={(value) => {
                const int = Number(value);
                if (isNaN(int)) return;
                if (int > total) setDiscount(total.toString());
                else setDiscount(value);
              }}
              value={discount}
            />
            <Text variant="TextMedium" tw="text-lg">
              {currency}
            </Text>
          </View>
        </View>
        <Divider tw="bg-gray-400 mb-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.priceWithDiscount')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {finalPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: company?.currency,
            })}
          </Text>
        </View>
        <Divider tw="bg-gray-400 my-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <View tw="flex flex-row items-center space-x-1">
            <Text variant="TextMedium" tw="text-lg">
              {`${t('Dashboard.CrateManagement.CheckOut.paymentType.label')}`}
            </Text>
            <Text variant="TextMedium" tw="text-lg text-red-400">
              *
            </Text>
          </View>
          <SelectWithStore<EPaymentMethod>
            testID="payment-method-select"
            datums={[
              EPaymentMethod.CASH,
              EPaymentMethod.CREDIT_CARD,
              ...(company?.country === 'NG' ? [EPaymentMethod.BANK_TRANSFER] : []),
            ]}
            isModalVisible={isPaymentTypeModalOpen}
            setIsModalVisible={setIsPaymentTypeModalOpen}
            useSelectStore={usePaymentTypeStore}
            itemName={(item) =>
              item === EPaymentMethod.CASH
                ? t('Dashboard.CrateManagement.CheckOut.paymentType.cash')
                : item === EPaymentMethod.CREDIT_CARD
                  ? t('Dashboard.CrateManagement.CheckOut.paymentType.creditCard')
                  : t('Dashboard.CrateManagement.CheckOut.paymentType.bankTransfer')
            }
            label={paymentMethodLabel}
            modalHeader={t('Dashboard.Management.RevenueAnalysis.paymentType.label')}
            postSelectionAction={(paymentMethod?: EPaymentMethod) => {
              if (paymentMethod === EPaymentMethod.BANK_TRANSFER) {
                setIsBankTransferDetailsModalOpen(true);
              }
            }}
          />
        </View>
        <Divider tw="bg-gray-400 my-2" />
        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.paid')}
          </Text>
          <Switch value={isPaid} onChange={() => setIsPaid(!isPaid)} testID="checkout-paid" />
        </View>
        <Divider tw="bg-gray-400 my-2" />
      </KeyboardAwareScrollView>

      <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-16 pt-4 absolute bottom-[-5%] left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
        <Button
          style={{ width: BUTTON_WIDTH }}
          mode="outlined"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            navigation.goBack();
          }}
          icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
          disabled={isSubmitting}
        >
          {t('actions.back')}
        </Button>
        <Button
          testID="checkout-ok-button"
          style={{ width: BUTTON_WIDTH }}
          mode="contained"
          uppercase
          onPress={checkout}
          contentStyle="flex flex-row-reverse items-center"
          icon="check-circle-outline"
          disabled={!isPaid || !paymentMethod || isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.ok')}
        </Button>
      </HideWithKeyboardView>

      <BankTransferModal
        isOpen={isBankTransferDetailsModalOpen}
        closeModal={() => setIsBankTransferDetailsModalOpen(false)}
      />
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(BillingInfo, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
