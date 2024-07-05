import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Divider, Icon, Switch } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

import { useTranslationUtils } from '#i18n/utils';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckOutStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { EPaymentType, EPricingType } from '#types/global';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import SelectWithStore, { createSelectStore } from '../../components/SelectWithStore';

const usePaymentTypeStore = createSelectStore<EPaymentType>();

function BillingInfo({ route, navigation }: CheckOutStackRouteProps<'BillingInfo'>) {
  const { user, crates, coolingUnit } = route.params;

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const { t } = useTranslationUtils();
  const toast = useToast();

  const { company } = useManagementStore();
  const { selectedItem: paymentType } = usePaymentTypeStore();
  const { refreshDashboard } = useDashboardStore();

  const [discount, setDiscount] = useState<number>(0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState<boolean>(false);

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
    // TODO: figure out how to deal with fixed price
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
      : t('Dashboard.CrateManagement.CheckOut.paymentType.creditCard');
  }, [paymentType]);

  const checkout = useCallback(async () => {
    if (!crates || !user) {
      toast.show(t('Dashboard.CrateManagement.operationError'), {
        type: 'danger',
      });
      return;
    }

    await ColdtivateService.checkOut({
      crates: crates?.map((crate) => crate.id),
      operatorId: user.user,
      priceDiscount: discount,
      currency: currency,
      paymentType: paymentType as EPaymentType,
      paid: isPaid,
    });

    refreshDashboard?.();
    rootNavigation.navigate('RootMainTabStack');
  }, [user, crates, discount, currency, paymentType, isPaid, refreshDashboard]);

  return (
    <View tw="flex-1 p-4">
      <ScrollView>
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
            {totalWeight}
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
            data={crates}
            renderItem={({ item: crate, index }) => (
              <View key={`${crate.id}-${index}`} tw="flex flex-row items-center justify-between">
                <View tw="flex flex-row space-x-1 items-center">
                  <Icon source="circle-medium" size={20} />
                  <Text
                    variant="TextMedium"
                    tw="text-lg"
                  >{`${crate.name} () — ${crate.weight}${t('Dashboard.ProduceDetails.kilogram')}/${crate.currentStorageDays} ${t('Dashboard.CrateManagement.CheckOut.days')}`}</Text>
                </View>
                <Text variant="TextMedium" tw="text-lg">
                  {cratePrices[index]?.toFixed(2)}
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
            {total.toFixed(2)}
          </Text>
        </View>
        <Divider tw="bg-gray-400 mt-2" />

        <View tw="flex flex-row w-full justify-between items-center">
          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.CrateManagement.CheckOut.discount')}
          </Text>
          <View tw="flex flex-row items-center space-x-1">
            <Input
              tw="bg-gray-100 rounded-sm mt-2 mb-3 h-7 w-12"
              keyboardType="numeric"
              onChangeText={(value) =>
                setDiscount(Number.isNaN(value) ? 0 : Number.parseInt(value))
              }
              value={Number.isNaN(discount) ? '0' : discount.toString()}
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
            {(total - discount).toFixed(2)}
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
            datums={[EPaymentType.CASH, EPaymentType.CREDIT_CARD]}
            isModalVisible={isPaymentTypeModalOpen}
            setIsModalVisible={setIsPaymentTypeModalOpen}
            useSelectStore={usePaymentTypeStore}
            itemName={(item) =>
              item === EPaymentType.CASH
                ? t('Dashboard.CrateManagement.CheckOut.paymentType.cash')
                : t('Dashboard.CrateManagement.CheckOut.paymentType.creditCard')
            }
            label={paymentTypeLabel}
            modalHeader={t('Dashboard.CoolingUnitsPlanner.SelectCoolingUnit.header')}
          />
        </View>
        <Divider tw="bg-gray-400 my-2" />
        <View tw="flex flex-row w-full justify-between items-center">
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
    </View>
  );
}

export default withSafeArea(BillingInfo);
