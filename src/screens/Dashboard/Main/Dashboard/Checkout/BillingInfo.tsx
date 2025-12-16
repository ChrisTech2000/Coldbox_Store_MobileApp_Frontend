import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
import { ECoolingUnitMetric, EPaymentMethod, EPaymentThrough, EPricingType } from '#types/global';
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
import { CurrencyText } from '#ui/components/CurrencyText';

import { useMarketplaceListing } from '../../Marketplace/utils';
import { BankTransferModal } from './BankTransferDetailsModal';
import { formatCurrencyWithSymbol } from '../CheckIn/utils';

const DEVICE_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = (DEVICE_WIDTH - 42) / 2;
const GREEN_PRIMARY = '#07857E';
const CRATE_LIST_MAX_HEIGHT = 200;
const CRATE_ROW_ESTIMATED_HEIGHT = 52;

const getCurrencySymbol = (currencyCode: string): string => {
  // Extract just the symbol from formatted currency
  const formatted = formatCurrencyWithSymbol(currencyCode, 0);
  const match = formatted.match(/^([^\d\s,.]+)/);
  return match ? match[1] : currencyCode;
};

export const usePaymentTypeStore = createSelectStore<EPaymentMethod>();

function BillingInfo({ route, navigation }: CheckOutStackRouteProps<'BillingInfo'>) {
  const { user, crates: datums, coolingUnit } = route.params;

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();

  console.log(datums);
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
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

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
    const metric = coolingUnit?.commonPricingType?.metric;

    if (type === EPricingType.PERIODICITY) {
      if (metric === ECoolingUnitMetric.KILOGRAMS) {
        return `${price}${currency} / ${t('Dashboard.ProduceDetails.kilogram')} / ${t('Dashboard.CrateManagement.CheckOut.day')}`;
      }
      return `${price}${currency} / ${t('Dashboard.CrateManagement.CheckOut.crate')} / ${t('Dashboard.CrateManagement.CheckOut.day')}`;
    }

    if (metric === ECoolingUnitMetric.KILOGRAMS) {
      return `${price}${currency} / ${t('Dashboard.ProduceDetails.kilogram')}`;
    }
    return `${price}${currency} / ${t('Dashboard.CrateManagement.CheckOut.crate')}`;
  }, [coolingUnit, currency, t]);

  const cratePrices = useMemo(() => {
    return (crates ?? []).map((crate) => {
      return Number(crate.cmpTotalInCoolingFees) || 0;
    });
  }, [crates]);

  const total = useMemo(() => {
    return cratePrices?.reduce((acc: number, current) => (acc += current ?? 0), 0) ?? 0;
  }, [cratePrices]);

  const totalPaidCoolingFeesFromMarketplace = useMemo(() => {
    if (company?.country !== 'NG') return 0;
    return (crates ?? []).reduce((acc, crate) => {
      return acc + (crate.paidCoolingFeesFromMarketplace || 0);
    }, 0);
  }, [crates, company?.country]);

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

  const finalPrice =
    total -
    (isNaN(Number(discount)) ? 0 : Math.min(Number(discount), total)) -
    totalPaidCoolingFeesFromMarketplace;

  const crateListHeight = useMemo(() => {
    const count = crates?.length ?? 0;
    const desired = count * CRATE_ROW_ESTIMATED_HEIGHT;
    if (desired === 0) return CRATE_LIST_MAX_HEIGHT;
    return Math.min(CRATE_LIST_MAX_HEIGHT, desired);
  }, [crates]);

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

        <View style={{ maxHeight: CRATE_LIST_MAX_HEIGHT, height: crateListHeight }}>
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
            estimatedItemSize={CRATE_ROW_ESTIMATED_HEIGHT}
          />
        </View>
        <Divider tw="bg-gray-400 mb-6" />

        <Text variant="TextMedium" tw="text-lg font-semibold mb-4">
          {t('Dashboard.CrateManagement.CheckOut.transactionFeeDetails')}
        </Text>

        <View tw="bg-green-50 rounded-xl py-3 px-2">
          <View tw="flex-row items-center justify-between">
            <Text variant="TextMedium" tw="text-lg">
              {t('Dashboard.CrateManagement.CheckOut.calculatedPrice')}
            </Text>
            <CurrencyText
              currency={company?.currency || ''}
              amount={total}
              symbolTw="text-gray-500"
              amountTw="text-gray-700"
              containerTw="text-lg"
            />
          </View>

          <View tw="flex-row items-center justify-between rounded-lg mt-2 py-2">
            <Text variant="TextMedium" tw="text-lg">
              {t('Dashboard.CrateManagement.CheckOut.discount')}
            </Text>
            <View tw="flex-row items-center">
              <Input
                tw="bg-green-transparency h-8 w-24 pr-2"
                style={{ textAlign: 'right' }}
                keyboardType="numeric"
                onChangeText={(value) => {
                  const numericValue = value.replace(/[^0-9]/g, '');
                  const int = Number(numericValue);
                  if (isNaN(int)) return;
                  const maxDiscount = total - totalPaidCoolingFeesFromMarketplace;
                  if (int > maxDiscount) setDiscount(maxDiscount.toString());
                  else setDiscount(numericValue);
                }}
                value={discount ? `-${getCurrencySymbol(currency)}${discount}` : ''}
              />
            </View>
          </View>

          {totalPaidCoolingFeesFromMarketplace > 0 && (
            <View style={{ marginTop: 10 }}>
              <View tw="flex-row justify-between" style={{ alignItems: 'flex-start' }}>
                <Pressable onPress={() => setIsTooltipVisible(true)}>
                  <View tw="flex-row items-center">
                    <Icon source="information-outline" size={20} color={GREEN_PRIMARY} />
                    <Text variant="TextMedium" tw="text-lg ml-1">
                      {t('Dashboard.CrateManagement.CheckOut.coolingFeesAlreadyPaid')}
                    </Text>
                  </View>
                </Pressable>
                <Text variant="TextMedium" tw="text-lg">
                  <Text tw="text-red-600">- </Text>
                  <CurrencyText
                    currency={company?.currency || ''}
                    amount={totalPaidCoolingFeesFromMarketplace}
                    symbolTw="text-gray-500"
                    amountTw="text-red-600"
                  />
                </Text>
              </View>

              {isTooltipVisible && (
                <>
                  <TouchableWithoutFeedback onPress={() => setIsTooltipVisible(false)}>
                    <View
                      style={{
                        position: 'absolute',
                        top: -500,
                        left: -500,
                        right: -500,
                        bottom: -500,
                      }}
                    />
                  </TouchableWithoutFeedback>
                  <View
                    tw="bg-[#162B3B] z-10 rounded-lg p-3 shadow-lg mx-4 mb-2"
                    style={{ position: 'absolute', bottom: '100%' }}
                  >
                    <Text tw="text-white text-sm">
                      {t('Dashboard.CrateManagement.CheckOut.coolingFeesAlreadyPaidTooltip')}
                    </Text>
                  </View>
                </>
              )}
            </View>
          )}

          <View
            tw="flex-row items-center justify-between mt-2 pt-2 border-green-primary"
            style={{ borderTopWidth: 1 }}
          >
            <Text variant="TextMedium" tw="text-lg font-semibold">
              {t('Dashboard.CrateManagement.CheckOut.priceWithDiscount')}
            </Text>
            <CurrencyText
              currency={company?.currency || ''}
              amount={finalPrice}
              symbolTw="text-gray-500"
              amountTw="text-green-primary font-semibold"
              containerTw="text-lg"
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          tw="flex flex-row w-full justify-between items-center mt-4"
          onPress={() => setIsPaymentTypeModalOpen(true)}
        >
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
        </TouchableOpacity>
        <Divider tw="bg-gray-400 my-2" />
        <View tw="flex flex-row w-full justify-between items-center mb-4">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.paid')}
          </Text>
          <Switch value={isPaid} onChange={() => setIsPaid(!isPaid)} testID="checkout-paid" />
        </View>
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
