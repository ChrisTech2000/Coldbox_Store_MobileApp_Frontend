import Clipboard from '@react-native-clipboard/clipboard';
import React, { useCallback, useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon, List } from 'react-native-paper';
import { currencies } from 'currencies.json';
import isNil from 'lodash/isNil';

import MineCart from '#assets/icons/mine-cart.svg';
import InAppNotifications from '#common/InAppNotifications';
import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import type { ProduceDetailsStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { ECoolingUnitMetric, EPricingType } from '#types/global';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import CheckoutButtonRedirect from './components/CheckoutButtonRedirect';
import RBAC from '#common/RBAC';

function ProduceDetails(props: ProduceDetailsStackRouteProps<'Root'>) {
  const { produce, coolingUnit, currency } = props.route.params;
  const { t } = useTranslationUtils();
  const { user } = useAuthStore();
  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();

  const { data: farmers } = useApiCall(
    'getOperatorFarmers',
    ColdtivateService.getOperatorFarmers,
    {
      operator: user?.id as number,
    },
    {
      skip: !user?.id,
      defaultData: [],
    }
  );

  const crates = produce.checkedInCrates.length;

  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'md_success' });
    },
    [toast]
  );

  const pricing = useMemo(() => {
    const pricing = produce.checkedInCrates[0].pricing[0];
    const metric =
      produce.checkedInCrates[0].coolingUnitMetric === ECoolingUnitMetric.KILOGRAMS
        ? produce.cratesCombinedWeight
        : produce.cratesAmount;

    if (pricing.pricingType === EPricingType.FIXED) {
      return pricing.fixedRate * metric;
    }

    return produce.plannedDays ? pricing.dailyRate * metric * produce.plannedDays : 'N/A';
  }, [produce]);

  const percentage = useMemo(() => {
    const quality = produce.qualityDt * 100;
    if (quality > 100) return 100;
    if (quality < 0 || isNaN(quality)) return 0;
    return quality;
  }, [produce]);

  const dailyPrice = useMemo(() => {
    return (
      produce.checkedInCrates[0].pricing[0].dailyRate *
      (produce.checkedInCrates[0].coolingUnitMetric === ECoolingUnitMetric.KILOGRAMS
        ? produce.cratesCombinedWeight
        : produce.cratesAmount)
    );
  }, [produce]);

  const data = useMemo(
    () => [
      {
        key: 'cropType',
        label: t('Dashboard.ProduceDetails.cropType'),
        value: produce.cropName,
      },
      ...(guard('SET', 'MarketplaceEditListedCrates')
        ? [
            {
              key: 'crateWeightLabel',
              label: t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightLabel'),
              value: <Icon source="chevron-right" size={25} />,
              custom: true,
            },
          ]
        : []),
      {
        key: 'numberOfCrates',
        label: t('Dashboard.ProduceDetails.numberOfCrates'),
        value: produce.checkedInCrates.length,
      },
      {
        key: 'crateIds',
        label: t('Dashboard.ProduceDetails.crateIds'),
        value: produce.checkedInCrates
          .map((crate) => crate.tag)
          .filter(Boolean)
          .join(', '),
      },
      {
        key: 'combinedWeight',
        label: t('Dashboard.ProduceDetails.combinedWeight'),
        value: `${produce.cratesCombinedWeight}${t('Dashboard.ProduceDetails.kilogram')}`,
      },
      {
        key: 'remainingTime',
        label: t('Dashboard.ProduceDetails.remainingTime'),
        value: produce.minimumRemainingShelfLife,
      },
      {
        key: 'currentStorageDays',
        label: t('Dashboard.ProduceDetails.currentStorageDays'),
        value: produce.currentStorageDays,
      },
      {
        key: 'plannedDays',
        label: t('Dashboard.ProduceDetails.plannedDays'),
        value: produce.plannedDays,
      },
      produce.checkedInCrates[0].pricing[0].pricingType === EPricingType.PERIODICITY
        ? {
            key: 'pricePerDay',
            label: t('Dashboard.ProduceDetails.pricePerDay'),
            value: dailyPrice?.toLocaleString('en-US', {
              style: 'currency',
              currency: currency,
            }),
          }
        : {},
      {
        key: 'plannedStorageCost',
        label: t('Dashboard.ProduceDetails.plannedStorageCost'),
        value: pricing.toLocaleString('en-US', {
          style: 'currency',
          currency: currency,
        }),
      },
    ],
    [produce, pricing, currency, dailyPrice, guard]
  );

  const farmer = useMemo(
    () =>
      farmers?.find(
        (farmer) => `${farmer.user.firstName} ${farmer.user.lastName}` === produce.farmer
      ),
    [produce, farmers]
  );

  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="flex-col items-center justify-center space-y-4 pb-24">
          <View tw="flex flex-row items-center space-x-3">
            <FastImage
              resizeMode="contain"
              tw="w-32 h-32"
              source={{ uri: `${API_BASE_URL}media/${produce.cropImage}` }}
            />
            <View tw="space-y-3">
              <View>
                <Text variant="TextMedium" tw="text-gray-400">
                  {t('Dashboard.ProduceDetails.coolingUser')}
                </Text>
                <Text variant="TextMedium">{produce.farmer}</Text>
              </View>
              <View>
                <Text variant="TextMedium" tw="text-gray-400">
                  {t('Dashboard.ProduceDetails.contact')}
                </Text>
                <View tw="flex flex-row items-center space-x-2">
                  <Text variant="TextMedium">{produce.farmerContact}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(produce.farmerContact)}>
                    <Icon source="content-copy" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {produce.runDt && produce.qualityDt !== -1 ? (
            <View tw="w-full px-2">
              <View tw="relative w-full h-3 bg-gray-300 rounded-lg">
                <View
                  tw={cn(
                    'absolute top-0 left-0 w-full bg-green-100 rounded-lg h-3',
                    produce.minimumRemainingShelfLife <= 7 &&
                      produce.minimumRemainingShelfLife > 2 &&
                      'bg-yellow-400',
                    produce.minimumRemainingShelfLife <= 2 && 'bg-red-300',
                    (isNil(produce.minimumRemainingShelfLife) ||
                      produce.minimumRemainingShelfLife === -1) &&
                      'bg-gray-300'
                  )}
                  style={{
                    width: `${100 - percentage + (percentage > 1 ? 10 : 0)}%`,
                    opacity: 0.4,
                    maxWidth: '100%',
                  }}
                />
                {percentage > 0 && (
                  <View
                    tw={cn(
                      'absolute top-0 right-0 w-full bg-green-300 rounded-lg h-3',
                      produce.minimumRemainingShelfLife <= 7 &&
                        produce.minimumRemainingShelfLife > 2 &&
                        'bg-yellow-400',
                      produce.minimumRemainingShelfLife <= 2 && 'bg-red-700',
                      (isNil(produce.minimumRemainingShelfLife) ||
                        produce.minimumRemainingShelfLife === -1) &&
                        'bg-gray-300'
                    )}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                )}
              </View>

              <View tw="flex flex-row items-center justify-between">
                <Text variant="TextMedium" tw="px-2">
                  {percentage}%
                </Text>
                <Text variant="TextMedium" tw="px-2">
                  {t('Dashboard.ProduceDetails.pickUp')}
                </Text>
                <Text
                  variant="TextMedium"
                  tw="px-2"
                >{`${produce.minimumRemainingShelfLife ?? 0} ${t('Dashboard.ProduceDetails.days')}`}</Text>
              </View>
            </View>
          ) : (
            <Text variant="TextMedium" tw="text-lg px-2">
              {t('Dashboard.ProduceDetails.noDTMessage')}
            </Text>
          )}

          <View tw="flex flex-row items-center space-x-2">
            <MineCart width={16} height={16} />
            <Text variant="TitleBold">
              {`${crates} ${crates === 1 ? t('Dashboard.ProduceDetails.crate') : t('Dashboard.ProduceDetails.crates')}`}
            </Text>
          </View>

          <View tw="w-full px-3">
            <FlatList
              data={data}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, itemIdx) => `produce-details-list-item-${item.key}-#${itemIdx}`}
              renderItem={({ item }) => (
                <React.Fragment>
                  <List.Item
                    tw="p-0 m-0 py-1"
                    title={undefined}
                    left={() => (
                      <Text variant="TextMedium" tw="text-base">
                        {item.label}
                      </Text>
                    )}
                    right={() => {
                      if (item.custom) return item.value;
                      return (
                        <Text variant="TextMedium" tw="text-base text-gray-400">
                          {item.value ?? '-'}
                        </Text>
                      );
                    }}
                    {...(item.key === 'crateWeightLabel'
                      ? {
                          onPress: (evt) => {
                            evt.stopPropagation();
                            const farmerId = farmer?.id ?? produce.farmerId;
                            props.navigation.navigate('EditCrateWeightAndPricing', {
                              companyCurrency: currency,
                              currencySymbol:
                                currencies.find((c) => c.name === currency)?.symbol ?? '',
                              crates: produce.checkedInCrates,
                              farmerId,
                            });
                          },
                        }
                      : {})}
                  />
                  <Divider />
                </React.Fragment>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <RBAC.ProtectedResource action="VIEW" subject="OperatorActions">
        <View tw="absolute left-0 bottom-0 bg-white border-t border-zinc-300 w-full h-20 items-center justify-center">
          <CheckoutButtonRedirect
            coolingUnit={coolingUnit}
            farmer={farmer}
            crates={produce.checkedInCrates}
          />
        </View>
      </RBAC.ProtectedResource>
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(ProduceDetails, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
