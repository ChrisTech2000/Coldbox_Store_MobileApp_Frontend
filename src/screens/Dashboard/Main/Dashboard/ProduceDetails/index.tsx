import Clipboard from '@react-native-clipboard/clipboard';
import isNil from 'lodash/isNil';
import React, { useCallback, useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider, Icon, List } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import MineCart from '#assets/icons/mine-cart.svg';
import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { API_BASE_URL } from '#constants/environment';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { ProduceDetailsStackRouteProps } from '#navigation/Dashboard/Main/MainTabStack/ProduceDetailsStack';
import { MarketplaceListing1ScreenOverlay } from '#screens/Dashboard/Tutorial/MarketplaceOverlay';
import { EMarketplaceTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import { useAuthStore } from '#stores/auth';
import { ECoolingUnitMetric, EPricingType, ERoles } from '#types/global';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import CheckoutButtonRedirect from './components/CheckoutButtonRedirect';

function ProduceDetails(props: ProduceDetailsStackRouteProps<'Root'>) {
  const { t } = useTranslationUtils();
  const [user] = useAuthStore(useShallow((store) => [store.user]));
  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();

  const { produce, coolingUnit, currency } = props.route.params;

  const crates = produce.checkedInCrates.length;

  const { onLayout } = useWalkthroughStep({
    number: EMarketplaceTutorialSteps.LIST_FOR_SALE_STEP,
    OverlayComponent: MarketplaceListing1ScreenOverlay,
  });

  const percentage = useMemo(() => {
    const quality = produce.qualityDt * 100;
    if (quality > 100) return 100;
    if (quality < 0 || isNaN(quality)) return 0;
    return quality;
  }, [produce]);

  const dailyPrice = useMemo(() => {
    if (produce.checkedInCrates[0]?.calculatedDailyRate) {
      const metric =
        produce.checkedInCrates[0].coolingUnitMetric === ECoolingUnitMetric.KILOGRAMS
          ? produce.cratesCombinedWeight
          : produce.cratesAmount;
      return produce.checkedInCrates[0].calculatedDailyRate * metric;
    }
    return (
      produce.checkedInCrates[0].pricing[0].dailyRate *
      (produce.checkedInCrates[0].coolingUnitMetric === ECoolingUnitMetric.KILOGRAMS
        ? produce.cratesCombinedWeight
        : produce.cratesAmount)
    );
  }, [produce]);

  const plannedStorageCost = useMemo(() => {
    if (!produce.plannedDays) {
      return null;
    }

    const pricingType =
      produce.checkedInCrates[0]?.effectivePricingType ||
      produce.checkedInCrates[0]?.pricing[0]?.pricingType;

    if (pricingType === EPricingType.FIXED) {
      return produce.cratesCombinedCost;
    }

    // For PERIODICITY: dailyPrice × plannedDays
    return dailyPrice * produce.plannedDays;
  }, [produce, dailyPrice]);

  const data = useMemo(
    () => [
      {
        key: 'cropType',
        label: t('Dashboard.ProduceDetails.cropType'),
        value: produce.cropName,
      },
      // TODO: find a better way to check if produce belongs to the user (might cause issues if user updates their number)
      ...(guard('SET', 'MarketplaceEditListedCrates') || produce.ownerContact === user?.phone
        ? [
            {
              key: 'crateWeightLabel',
              label: t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightLabel'),
              value: (
                <View tw="self-center">
                  <Icon
                    source={LanguageManager.isRTL ? 'chevron-left' : 'chevron-right'}
                    size={25}
                  />
                </View>
              ),
              onLayout,
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
        value: produce.plannedDays || '-',
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
        value:
          plannedStorageCost !== null
            ? plannedStorageCost.toLocaleString('en-US', {
                style: 'currency',
                currency: currency,
              })
            : '-',
      },
    ],
    [produce, plannedStorageCost, currency, dailyPrice, guard, user]
  );

  const amountOfListedCrates = useMemo(
    () =>
      produce.checkedInCrates.reduce(
        (acc, curr) => (curr?.listedInTheMarketplace ? (acc += 1) : acc),
        0
      ),
    [produce]
  );

  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'md_success' });
    },
    [toast]
  );

  const renderContactDetails = () => {
    if (user?.role === ERoles.COOLING_USER && !produce.operatorContact && !produce.operatorName) {
      return null;
    }

    const contactName = user?.role === ERoles.COOLING_USER ? produce.operatorName : produce.owner;
    const contactPhone =
      user?.role === ERoles.COOLING_USER ? produce.operatorContact : produce.ownerContact;
    const roleLabel =
      user?.role === ERoles.COOLING_USER
        ? t('Auth.SignIn.accounts.operator.label')
        : t('Dashboard.Marketplace.owner');

    return (
      <View tw="space-y-3">
        <View>
          <Text tw="text-gray-400">{roleLabel}</Text>
          <Text>{contactName}</Text>
        </View>
        <View>
          <Text tw="text-gray-400">{t('Dashboard.ProduceDetails.contact')}</Text>
          <TouchableOpacity
            tw="flex flex-row items-center space-x-2"
            onPress={() => copyToClipboard(contactPhone)}
            activeOpacity={0.7}
          >
            <Text>{contactPhone}</Text>
            <Icon source="content-copy" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
            {renderContactDetails()}
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
                <Text tw="px-2">{percentage.toFixed(2)}%</Text>
                <Text tw="px-2">{t('Dashboard.ProduceDetails.pickUp')}</Text>
                <Text tw="px-2">{`${produce.minimumRemainingShelfLife ?? 0} ${t('Dashboard.ProduceDetails.days')}`}</Text>
              </View>
            </View>
          ) : (
            <Text tw="text-base px-2">{t('Dashboard.ProduceDetails.noDTMessage')}</Text>
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
                    onLayout={item.onLayout}
                    title={undefined}
                    left={() => (
                      <View tw="flex-col">
                        <Text tw="text-base">{item.label}</Text>
                        {item.key === 'crateWeightLabel' ? (
                          <Text tw="text-sm text-zinc-500">
                            {t('Dashboard.ProduceDetails.cratesListedForSale', {
                              amount: amountOfListedCrates,
                            })}
                          </Text>
                        ) : null}
                      </View>
                    )}
                    right={() => {
                      if (item.custom) return item.value;
                      return <Text tw="text-base text-gray-400">{item.value ?? '-'}</Text>;
                    }}
                    {...(item.key === 'crateWeightLabel'
                      ? {
                          onPress: (evt) => {
                            evt.stopPropagation();
                            props.navigation.navigate('EditCrateWeightAndPricing', {
                              companyCurrency: currency,
                              produce,
                              coolingUnit,
                              companyId: props.route.params.companyId,
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
        <CheckoutButtonRedirect coolingUnit={coolingUnit} owner={produce.owner} produce={produce} />
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
