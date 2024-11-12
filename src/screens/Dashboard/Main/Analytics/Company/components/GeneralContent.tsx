import React, { useMemo } from 'react';
import { View } from 'react-native';

import Logo from '#assets/images/coldtivate_logo.svg';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';

import { useCompanyData } from '../store';

export function GeneralContent() {
  const { t } = useTranslationUtils();
  const { company } = useManagementStore();
  const { companyData } = useCompanyData();

  const { marketUnits, farmGateUnits, movableUnits } = useMemo(() => {
    return {
      farmGateUnits: companyData?.coolingUnitTypes?.[0]?.farmGateStorageRoom ?? 0,
      marketUnits: companyData?.coolingUnitTypes?.[0]?.marketStorageRoom ?? 0,
      movableUnits: companyData?.coolingUnitTypes?.[0]?.movableUnit ?? 0,
    };
  }, [companyData]);

  const numberOfUnits = marketUnits + farmGateUnits + movableUnits;

  return (
    <View tw="bg-violet-100 items-center w-full rounded-lg py-2 my-2">
      <Logo width={50} height={50} tw="mb-4" />
      <View tw="flex flex-row flex-wrap items-center justify-center space-x-2 space-y-2">
        <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
          <Text variant="TextMedium" tw="text-base text-white mb-2">
            {t(`Dashboard.Analytics.companyTab.companyNameLabel`)}
          </Text>
          <Text variant="TextBold" tw="text-base text-white">
            {company?.name}
          </Text>
        </View>

        <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
          <Text variant="TextMedium" tw="text-base text-white mb-2">
            {t(`Dashboard.Analytics.companyTab.revenueLabel`)}
          </Text>
          <Text variant="TextBold" tw="text-base text-white">
            {companyData?.compRevenue?.[0]?.toLocaleString('en-US', {
              style: 'currency',
              currency: companyData?.currency[0],
            })}
          </Text>
        </View>

        <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
          <Text variant="TextMedium" tw="text-base text-white mb-2">
            {t(`Dashboard.Analytics.companyTab.coolingUnitsLabel`)}
          </Text>
          <Text variant="TextBold" tw="text-base text-white">
            {numberOfUnits > 1
              ? t(`Dashboard.Analytics.companyTab.coolingUnitsContent`, {
                  amount: numberOfUnits,
                })
              : t(`Dashboard.Analytics.companyTab.singleCoolingUnitContent`)}
          </Text>
        </View>

        <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
          <Text variant="TextMedium" tw="text-base text-white mb-2">
            {t(`Dashboard.Analytics.companyTab.capacityLabel`)}
          </Text>
          <Text variant="TextBold" tw="text-base text-white">
            {t(`Dashboard.Analytics.companyTab.capacityContent`, {
              amount: companyData?.compCapTons?.[0] ?? 0,
            })}
          </Text>
        </View>

        <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
          <Text variant="TextMedium" tw="text-base text-white mb-2">
            {t(`Dashboard.Analytics.companyTab.coolingUnitTypeLabel`)}
          </Text>
          <Text variant="TextBold" tw="text-base text-white">
            {t(`Dashboard.Analytics.companyTab.coolingUnitTypeMarket`, { amount: marketUnits })}
          </Text>
          <Text variant="TextBold" tw="text-base text-white">
            {t(`Dashboard.Analytics.companyTab.coolingUnitTypeFarmGate`, {
              amount: farmGateUnits,
            })}
          </Text>
          <Text variant="TextBold" tw="text-base text-white">
            {t(`Dashboard.Analytics.companyTab.coolingUnitTypeMovable`, { amount: movableUnits })}
          </Text>
        </View>
      </View>
    </View>
  );
}
