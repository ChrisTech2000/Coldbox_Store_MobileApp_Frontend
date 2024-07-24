import { currencies } from 'currencies.json';
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Logo from '#assets/images/coldtivate_logo.svg';

import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import ImpactService from '#services/ImpactService';
import { useManagementStore } from '#stores/management';
import { ECoolingUnitType } from '#types/global';

import { useCompanyData } from '../store';

export function GeneralContent() {
  const { t } = useTranslationUtils();
  const { company } = useManagementStore();
  const { setCompanyData } = useCompanyData();

  const { data: coolingUnits, isLoading: loadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    { company: company?.id as number },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const { data: impactCompany, isLoading: loadingImpactCompany } = useApiCall(
    'getCompanyImpact',
    ImpactService.getCompanyImpact,
    company?.id as number,
    {
      skip: !company?.id,
    }
  );

  const coolingUnitsCapacity = useMemo(() => {
    return coolingUnits?.reduce((acc, unit) => (acc += unit.capacityInMetricTons), 0);
  }, [coolingUnits]);

  const { marketUnits, farmGateUnits, movableUnits } = useMemo(() => {
    const counters = {
      farmGateUnits: 0,
      marketUnits: 0,
      movableUnits: 0,
    };

    if (coolingUnits) {
      coolingUnits.forEach((unit) => {
        switch (unit.coolingUnitType) {
          case ECoolingUnitType.FARM_GATE_STORAGE_ROOM:
            counters.farmGateUnits += 1;
            break;
          case ECoolingUnitType.MARKET_STORAGE_ROOM:
            counters.marketUnits += 1;
            break;
          case ECoolingUnitType.MOVABLE_UNIT:
            counters.movableUnits += 1;
            break;
          default:
            break;
        }
      });
    }

    return counters;
  }, [coolingUnits]);

  useEffect(() => {
    if (impactCompany) {
      setCompanyData(impactCompany);
    }
  }, [impactCompany]);

  return (
    <View tw="bg-violet-100 items-center w-full rounded-lg py-2 my-2">
      <Logo width={50} height={50} tw="mb-4" />
      {loadingCoolingUnits || loadingImpactCompany ? (
        <View tw="flex-1 items-center justify-center mt-2">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      ) : (
        <View tw="flex flex-row flex-wrap items-center justify-center space-x-2 space-y-2">
          <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
            <Text variant="TextMedium" tw="text-lg text-white">
              {t(`Dashboard.Analytics.companyTab.companyNameLabel`)}
            </Text>
            <Text variant="TextBold" tw="text-lg text-white font-bold">
              {company?.name}
            </Text>
          </View>

          <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
            <Text variant="TextMedium" tw="text-lg text-white">
              {t(`Dashboard.Analytics.companyTab.revenueLabel`)}
            </Text>
            <Text variant="TextBold" tw="text-lg text-white font-bold">
              {currencies.find((c) => c.code === company?.currency)?.symbol ?? ''}
              {(impactCompany?.compRevenue?.[0] ?? 0).toFixed(2)}
            </Text>
          </View>

          <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
            <Text variant="TextMedium" tw="text-lg text-white">
              {t(`Dashboard.Analytics.companyTab.coolingUnitsLabel`)}
            </Text>
            <Text variant="TextBold" tw="text-lg text-white font-bold">
              {coolingUnits?.length && coolingUnits.length > 1
                ? t(`Dashboard.Analytics.companyTab.coolingUnitsContent`, {
                    amount: coolingUnits.length,
                  })
                : t(`Dashboard.Analytics.companyTab.singleCoolingUnitContent`)}
            </Text>
          </View>

          <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
            <Text variant="TextMedium" tw="text-lg text-white">
              {t(`Dashboard.Analytics.companyTab.capacityLabel`)}
            </Text>
            <Text variant="TextBold" tw="text-lg text-white font-bold">
              {t(`Dashboard.Analytics.companyTab.capacityContent`, {
                amount: coolingUnitsCapacity,
              })}
            </Text>
          </View>

          <View tw="bg-violet-950 rounded-md px-2 py-1 items-center">
            <Text variant="TextMedium" tw="text-lg text-white">
              {t(`Dashboard.Analytics.companyTab.coolingUnitTypeLabel`)}
            </Text>
            <Text variant="TextBold" tw="text-lg text-white font-bold">
              {t(`Dashboard.Analytics.companyTab.coolingUnitTypeMarket`, { amount: marketUnits })}
            </Text>
            <Text variant="TextBold" tw="text-lg text-white font-bold">
              {t(`Dashboard.Analytics.companyTab.coolingUnitTypeFarmGate`, {
                amount: farmGateUnits,
              })}
            </Text>
            <Text variant="TextBold" tw="text-lg text-white font-bold">
              {t(`Dashboard.Analytics.companyTab.coolingUnitTypeMovable`, { amount: movableUnits })}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
