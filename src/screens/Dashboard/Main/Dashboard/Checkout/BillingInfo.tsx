import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider, Icon, Switch } from 'react-native-paper';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';
import type { TemperatureAlertEvtDatum } from '#navigation/Dashboard/components/TemperatureAlert';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckOutStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { EPaymentType, EPricingType } from '#types/global';

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

import { BankTransferModal } from './BankTransferDetailsModal';

export const usePaymentTypeStore = createSelectStore<EPaymentType>();

function BillingInfo({ route, navigation }: CheckOutStackRouteProps<'BillingInfo'>) {
  const { user, crates, coolingUnit } = route.params;

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();

  const company = useManagementStore((store) => store.company);
  const [paymentType, resetPaymentStore] = usePaymentTypeStore((store) => [
    store.selectedItem,
    store.reset,
  ]);
  const { refreshData } = useDashboardStore();

  const [discount, setDiscount] = useState<string>('');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState<boolean>(false);
  const [isBankTransferDetailsModalOpen, setIsBankTransferDetailsModalOpen] =
    useState<boolean>(false);

  const { onLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.CHECK_OUT_STEP_3,
    OverlayComponent: CheckOut2ScreenOverlay,
    onPressMask: () => rootNavigation.navigate('RootMainTabStack'),
  });

  const { data: locations } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id ?? 0,
    {
      skip: !user?.id || !coolingUnit?.id,
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
    const type = coolingUnit?.commonPricingType.type;
    const price = coolingUnit?.commonPricingType.value;
    return type === EPricingType.PERIODICITY
      ? `${price}${currency} / ${t('Dashboard.CrateManagement.CheckOut.crate')} / ${t('Dashboard.CrateManagement.CheckOut.day')}`
      : price;
  }, [coolingUnit, currency]);

  const cratePrices = useMemo(() => {
    const type = coolingUnit?.commonPricingType.type;
    const price = coolingUnit?.commonPricingType.value;

    return (
      crates?.map((crate) =>
        type === EPricingType.PERIODICITY ? (price ?? 0) * crate.currentStorageDays : price
      ) ?? []
    );
  }, [coolingUnit, crates]);

  const total = useMemo(() => {
    return cratePrices?.reduce((acc: number, current) => (acc += current ?? 0), 0) ?? 0;
  }, [cratePrices]);

  const paymentTypeLabel = useMemo(() => {
    if (!paymentType) return '';
    return paymentType === EPaymentType.CASH
      ? t('Dashboard.CrateManagement.CheckOut.paymentType.cash')
      : paymentType === EPaymentType.CREDIT_CARD
        ? t('Dashboard.CrateManagement.CheckOut.paymentType.creditCard')
        : t('Dashboard.CrateManagement.CheckOut.paymentType.bankTransfer');
  }, [paymentType]);

  const checkout = useCallback(async () => {
    if (!crates || !user) {
      toast.show(t('Dashboard.CrateManagement.operationError'), {
        type: 'md_danger',
      });
      return;
    }

    const dInt = Number(discount);
    if (isNaN(dInt)) return;

    await ColdtivateService.checkOut({
      crates: crates?.map((crate) => crate.id),
      operatorId: user.user,
      priceDiscount: dInt,
      currency: currency,
      paymentType: paymentType as EPaymentType,
      paid: isPaid,
    });

    refreshData.forEach((fn) => fn());

    if (guard('VIEW', 'TemperatureAlertModal')) {
      const temperatureAlertDatum = {
        coolingUnitId: coolingUnit!.id,
        companyId: company!.id,
        showCompleteInfo: true,
      } satisfies TemperatureAlertEvtDatum;

      emitter.emit(APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT, temperatureAlertDatum);
    }

    rootNavigation.navigate('RootMainTabStack');
  }, [user, crates, discount, currency, paymentType, isPaid, refreshData, guard, coolingUnit?.id]);

  useEffect(() => {
    return () => resetPaymentStore();
  }, []);

  const finalPrice = total - (isNaN(Number(discount)) ? 0 : Math.min(Number(discount), total));

  return (
    <View tw="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.coolingUserLabel')}
          </Text>
          <Text variant="TextMedium" tw="text-lg">
            {user?.user.firstName}
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

        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={crates}
            renderItem={({ item: crate, index }) => (
              <View
                key={`${crate.id}-${index}`}
                tw="flex flex-row flex-wrap items-center justify-between"
              >
                <View tw="flex flex-row space-x-1 items-center">
                  <Icon source="circle-medium" size={20} />
                  <Text variant="TextMedium" tw="text-lg">
                    {`${crate.name} (${crate.tag ?? ''}) — ${crate.weight}${t('Dashboard.ProduceDetails.kilogram')}/${crate.currentStorageDays} ${t('Dashboard.CrateManagement.CheckOut.days')}`}
                  </Text>
                </View>

                <Text variant="TextMedium" tw="text-lg pl-2">
                  {(cratePrices[index] ?? 0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: company?.currency,
                  })}
                </Text>
              </View>
            )}
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
          <SelectWithStore<EPaymentType>
            datums={[
              EPaymentType.CASH,
              EPaymentType.CREDIT_CARD,
              ...(company?.country === 'NG' ? [EPaymentType.BANK_TRANSFER] : []),
            ]}
            isModalVisible={isPaymentTypeModalOpen}
            setIsModalVisible={setIsPaymentTypeModalOpen}
            useSelectStore={usePaymentTypeStore}
            itemName={(item) =>
              item === EPaymentType.CASH
                ? t('Dashboard.CrateManagement.CheckOut.paymentType.cash')
                : item === EPaymentType.CREDIT_CARD
                  ? t('Dashboard.CrateManagement.CheckOut.paymentType.creditCard')
                  : t('Dashboard.CrateManagement.CheckOut.paymentType.bankTransfer')
            }
            label={paymentTypeLabel}
            modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
            postSelectionAction={(paymentType?: EPaymentType) => {
              paymentType === EPaymentType.BANK_TRANSFER && setIsBankTransferDetailsModalOpen(true);
            }}
          />
        </View>
        <Divider tw="bg-gray-400 my-2" />
        <View onLayout={onLayout} tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.paid')}
          </Text>
          <Switch value={isPaid} onChange={() => setIsPaid(!isPaid)} />
        </View>
        <Divider tw="bg-gray-400 my-2" />
      </ScrollView>
      <View tw="flex flex-row space-x-2 w-full mt-4 justify-center">
        <Button
          tw="border-green-primary"
          mode="outlined"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            navigation.goBack();
          }}
          icon="arrow-left"
        >
          {t('actions.back')}
        </Button>
        <Button
          mode="contained"
          uppercase
          onPress={checkout}
          contentStyle="flex flex-row-reverse items-center"
          icon="check-circle-outline"
          disabled={!isPaid || !paymentType}
        >
          {t('actions.ok')}
        </Button>
      </View>

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
