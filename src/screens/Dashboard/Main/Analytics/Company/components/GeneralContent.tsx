import React, { useCallback, useMemo } from 'react';
import { View, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { useManagementStore } from '#stores/management';

import { useCompanyData } from '../store';
import { useAnalyticsData } from '../../store';

import { Icon } from 'react-native-paper';

import { EPaymentMethod, ECoolingUnitType } from '#types/global';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';

export function GeneralContent() {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const { company } = useManagementStore();
  const { companyData } = useCompanyData();
  const { coolingUnits } = useAnalyticsData();

  const { data: revenueData, refetch: refetchRevenue } = useApiCall(
    'getRevenueAnalysis',
    ColdtivateService.getRevenueAnalysis,
    {
      coolingUnits: coolingUnits.map((u) => u.id),
      paymentMethods: [
        EPaymentMethod.CREDIT_CARD,
        EPaymentMethod.CASH,
        EPaymentMethod.BANK_TRANSFER,
        EPaymentMethod.USSD,
        EPaymentMethod.OPAY,
      ],
    },
    { skip: coolingUnits.length === 0, defaultData: [] }
  );

  useFocusEffect(
    useCallback(() => {
      refetchRevenue?.();
    }, [refetchRevenue])
  );

  const localRevenue = useMemo(() => {
    if (!revenueData) return 0;
    const list = Array.isArray(revenueData) ? revenueData : ((revenueData as any)?.results || []);
    return list.reduce((sum: number, item: any) => sum + (item?.checkout?.totalPrice || 0), 0) ?? 0;
  }, [revenueData]);

  const { marketUnits, farmGateUnits, movableUnits, localCapacity } = useMemo(() => {
    return {
      farmGateUnits: companyData?.coolingUnitTypes?.[0]?.farmGateStorageRoom ?? coolingUnits.filter(u => u.coolingUnitType === ECoolingUnitType.FARM_GATE_STORAGE_ROOM).length,
      marketUnits: companyData?.coolingUnitTypes?.[0]?.marketStorageRoom ?? coolingUnits.filter(u => u.coolingUnitType === ECoolingUnitType.MARKET_STORAGE_ROOM).length,
      movableUnits: companyData?.coolingUnitTypes?.[0]?.movableUnit ?? coolingUnits.filter(u => u.coolingUnitType === ECoolingUnitType.MOVABLE_UNIT).length,
      localCapacity: coolingUnits.reduce((acc, u) => acc + (u.capacityInMetricTons || 0), 0)
    };
  }, [companyData, coolingUnits]);

  const numberOfUnits = (marketUnits + farmGateUnits + movableUnits) || coolingUnits.length;

  const totalRevenue = (
    companyData?.compRevenue?.[0] ??
    Object.values(companyData?.compRevenue ?? {})?.[0] ??
    localRevenue
  );

  const displayCapacity = (
    companyData?.compCapTons?.[0] ??
    Object.values(companyData?.compCapTons ?? {})?.[0] ??
    localCapacity
  );

  return (
    <View tw="w-full space-y-4 pb-10">
      {/* Profile Section - Minimalist Row */}
      <View tw="flex-row items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <View tw="w-12 h-12 bg-gray-50 rounded-full items-center justify-center border border-gray-100 mr-4">
          <Image
            source={require('#assets/images/coldbox-logo-edit.png')}
            style={{ width: 32, height: 32, resizeMode: 'contain' }}
          />
        </View>
        <View>
          <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase text-[10px] tracking-wider mb-0.5">
            {t(`Dashboard.Analytics.companyTab.companyNameLabel`)}
          </Text>
          <Text variant="HeadlineSmall" tw="text-gray-900 font-bold tracking-tight">
            {company?.name || 'Company'}
          </Text>
        </View>
      </View>

      {/* Primary Metrics - Minimalist Grid */}
      <View tw="flex-row space-x-3">
        {/* Revenue Card */}
        <View tw="flex-1 bg-white border border-gray-200 rounded-xl p-4 justify-between min-h-[110px] shadow-sm">
          <View tw="flex-row justify-between items-start mb-2">
            <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase text-[10px] tracking-wider flex-1 mr-2">
              {t(`Dashboard.Analytics.companyTab.revenueLabel`)}
            </Text>
            <Icon source="cash" size={20} color={colors.emerald[600]} />
          </View>
          <Text variant="HeadlineMedium" tw="text-gray-900 font-bold tracking-tight">
            ₦{totalRevenue.toLocaleString('en-US', {
              maximumFractionDigits: 0,
            })}
          </Text>
        </View>


        {/* Units Card */}
        <View tw="flex-1 bg-white border border-gray-200 rounded-xl p-4 justify-between min-h-[110px] shadow-sm">
          <View tw="flex-row justify-between items-start mb-2">
            <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase text-[10px] tracking-wider flex-1 mr-2">
              {t(`Dashboard.Analytics.companyTab.coolingUnitsLabel`)}
            </Text>
            <Icon source="snowflake" size={20} color={colors.blue[600]} />
          </View>
          <Text variant="HeadlineMedium" tw="text-gray-900 font-bold tracking-tight">
            {numberOfUnits}
          </Text>
        </View>
      </View>

      {/* Unit Types - Simple List */}
      <View tw="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <Text variant="TitleSmall" tw="text-gray-900 font-bold mb-4 tracking-tight">
          {t(`Dashboard.Analytics.companyTab.coolingUnitTypeLabel`)}
        </Text>
        <View tw="space-y-3">
          <UnitTypeRow
            label="Market"
            value={marketUnits}
            color={colors.blue[600]}
          />
          <UnitTypeRow
            label="Farm Gate"
            value={farmGateUnits}
            color={colors.emerald[600]}
          />
          <UnitTypeRow
            label="Movable"
            value={movableUnits}
            color={colors.amber[600]}
          />
        </View>
      </View>

      {/* Capacity - Standard Card */}
      <View tw="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center justify-between shadow-sm">
        <View>
          <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase text-[10px] tracking-wider mb-1">
            {t(`Dashboard.Analytics.companyTab.capacityLabel`)}
          </Text>
          <Text variant="TitleLarge" tw="text-gray-900 font-bold">
            {displayCapacity} <Text tw="text-sm text-gray-400 font-medium">TONS</Text>
          </Text>
        </View>
        <View tw="bg-gray-50 p-2 rounded-lg">
          <Icon source="weight" size={24} color={colors.gray[600]} />
        </View>
      </View>
    </View>
  );
}

function UnitTypeRow({ label, value, color }: any) {
  return (
    <View tw="flex-row items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <View tw="flex-row items-center space-x-3">
        <View style={{ backgroundColor: color }} tw="w-2.5 h-2.5 rounded-full" />
        <Text variant="TextMedium" tw="text-gray-700 font-medium text-sm">{label}</Text>
      </View>
      <Text variant="TextMedium" tw="text-gray-900 font-bold">{value}</Text>
    </View>
  );
}

