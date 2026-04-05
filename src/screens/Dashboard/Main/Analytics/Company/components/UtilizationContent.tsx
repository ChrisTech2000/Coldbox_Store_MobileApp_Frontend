import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Text } from '#ui/components/Text';
import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { useCompanyData } from '../store';

type SectionProps = {
  title: string;
  checkedIn: number;
  checkedOut: number;
};

import { Icon } from 'react-native-paper';
import { cn } from '#ui/lib/cn';

import { useAnalyticsData } from '../../store';
import coldboxstoreService from '#services/coldboxstoreService';
import { EInitiatedFor } from '#types/global';
import { useManagementStore } from '#stores/management';

export function UtilizationContent() {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const { companyData } = useCompanyData();
  const { coolingUnits: storeCoolingUnits } = useAnalyticsData();
  const { company } = useManagementStore();

  const [usageData, setUsageData] = useState<any[]>([]);

  // Direct fetch: get cooling units from company, then fetch usage data
  const fetchUsageData = useCallback(async () => {
    try {
      // Use store cooling units if available, otherwise fetch them
      let cuIds: number[] = storeCoolingUnits.map((u) => u.id);

      if (cuIds.length === 0 && company?.id) {
        const units = await coldboxstoreService.getCoolingUnits({ company: company.id });
        cuIds = (units || []).map((u: any) => u.id);
      }

      if (cuIds.length === 0) return;

      const data = await coldboxstoreService.getUsageAnalysis(cuIds);
      const arr = Array.isArray(data) ? data : (data as any)?.results || [];
      setUsageData(arr);
    } catch (err) {
      // Silently handle errors - display will fall back to companyData
    }
  }, [storeCoolingUnits, company]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchUsageData();
  }, [fetchUsageData]);

  // Refetch when screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchUsageData();
    }, [fetchUsageData])
  );

  const { localCratesIn, localCratesOut, localKgIn, localKgOut, localOpsIn, localOpsOut } = useMemo(() => {
    let cratesIn = 0, cratesOut = 0;
    let kgIn = 0, kgOut = 0;
    let opsIn = 0, opsOut = 0;

    usageData.forEach((movement: any) => {
      // CheckIn Side
      if (movement.initiatedFor === EInitiatedFor.CHECK_IN && movement.checkin) {
        opsIn++;
        cratesIn += movement.checkin.crates?.length || 0;
        kgIn += movement.checkin.crates?.reduce((sum: number, c: any) => sum + (c.weight || 0), 0) || 0;
      }

      // CheckOut Side
      if (movement.initiatedFor === EInitiatedFor.CHECK_OUT && movement.checkout) {
        opsOut++;
        cratesOut += movement.checkout.crates?.length || 0;
        kgOut += movement.checkout.crates?.reduce((sum: number, c: any) => sum + (c.affectedWeight ?? c.weight ?? 0), 0) || 0;
      }
    });

    return { localCratesIn: cratesIn, localCratesOut: cratesOut, localKgIn: kgIn, localKgOut: kgOut, localOpsIn: opsIn, localOpsOut: opsOut };
  }, [usageData]);

  const occupancy = useMemo(() => {
    if (companyData?.compAverageRoomOccupancy?.[0]) return companyData.compAverageRoomOccupancy[0];

    // Convert Metric Tons capacity into kgs for calculating available volume percent.
    const totalCapacityKg = storeCoolingUnits.reduce((sum: number, unit: any) => sum + ((unit.capacityInMetricTons || 0) * 1000), 0);
    const netKgInStorage = Math.max(0, localKgIn - localKgOut);

    return totalCapacityKg > 0
      ? (netKgInStorage > 0 ? Math.max(1, Math.round((netKgInStorage / totalCapacityKg) * 100)) : 0)
      : 0;
  }, [companyData, storeCoolingUnits, localKgIn, localKgOut]);

  const crates = useMemo(() => {
    return {
      checkedIn: localCratesIn || companyData?.compCratesIn?.[0] || 0,
      checkedOut: localCratesOut || companyData?.compCratesOut?.[0] || 0,
    };
  }, [companyData, localCratesIn, localCratesOut]);

  const quantity = useMemo(() => {
    return {
      checkedIn: localKgIn || companyData?.compKgIn?.[0] || 0,
      checkedOut: localKgOut || companyData?.compKgOut?.[0] || 0,
    };
  }, [companyData, localKgIn, localKgOut]);

  const operations = useMemo(() => {
    return {
      checkedIn: localOpsIn || companyData?.compOpsIn?.[0] || 0,
      checkedOut: localOpsOut || companyData?.compOpsOut?.[0] || 0,
    };
  }, [companyData, localOpsIn, localOpsOut]);

  return (
    <ScrollView
      tw="w-full mt-4"
      contentContainerStyle="items-center pb-24"
      showsVerticalScrollIndicator={false}
    >
      {/* Occupancy Card */}
      <View tw="w-full bg-white border border-green-100 p-5 rounded-3xl items-center mb-4 shadow-sm flex-row justify-between">
        <View tw="flex-row items-center space-x-3">
          <View tw="p-2.5 bg-green-50 rounded-xl justify-center items-center">
            <Icon source="barn" size={22} color={colors.green[700]} />
          </View>
          <View>
            <Text variant="TitleSmall" tw="text-gray-900 font-black tracking-tight">
              Storage Capacity
            </Text>
            <Text variant="TextSmall" tw="text-gray-400 font-bold uppercase text-[9px] tracking-widest">
              {t('Dashboard.Analytics.companyTab.utilizationTab.occupancyLabel')}
            </Text>
          </View>
        </View>
        <View tw="bg-green-100 px-3 py-1.5 rounded-2xl">
          <Text variant="TitleMedium" tw="text-green-900 font-black">
            {occupancy}%
          </Text>
        </View>
      </View>

      <View tw="w-full space-y-4">
        <MetricCard
          title="Produce Boxes"
          label={t('Dashboard.Analytics.totalCratesLabel')}
          icon="basket"
          color={colors.amber[600]}
          bgColor={colors.amber[50]}
          checkedIn={crates.checkedIn}
          checkedOut={crates.checkedOut}
        />
        <MetricCard
          title="Harvest Weight"
          label={t('Dashboard.Analytics.totalQuantityLabel')}
          icon="weight"
          color={colors.emerald[600]}
          bgColor={colors.emerald[50]}
          checkedIn={`${quantity.checkedIn} kg`}
          checkedOut={`${quantity.checkedOut} kg`}
        />
        <MetricCard
          title="Farm Operations"
          label={t('Dashboard.Analytics.totalOperations')}
          icon="tractor"
          color={colors.orange[600]}
          bgColor={colors.orange[50]}
          checkedIn={operations.checkedIn}
          checkedOut={operations.checkedOut}
        />
      </View>
    </ScrollView>
  );
}

function MetricCard({ title, label, icon, color, bgColor, checkedIn, checkedOut }: any) {
  const colors = useTailwindColors();
  return (
    <View tw="bg-white border border-gray-100 shadow-sm rounded-3xl p-5">
      <View tw="flex-row items-center space-x-3 mb-5">
        <View style={{ backgroundColor: bgColor }} tw="p-2.5 rounded-xl">
          <Icon source={icon} size={22} color={color} />
        </View>
        <View>
          <Text variant="TitleSmall" tw="text-gray-900 font-black tracking-tight">
            {title}
          </Text>
          <Text variant="TextSmall" tw="text-gray-400 font-bold uppercase text-[9px] tracking-widest">
            {label}
          </Text>
        </View>
      </View>

      <View tw="flex-row items-center justify-between space-x-4">
        <View tw="flex-1 bg-gray-50/50 rounded-2xl p-3 border border-gray-50">
          <Text variant="TextSmall" tw="text-gray-400 font-bold uppercase text-[8px] mb-1 tracking-widest">Added</Text>
          <View tw="flex-row items-center justify-between">
            <Text variant="TitleSmall" tw="text-gray-900 font-black">{checkedIn}</Text>
            <Icon source="arrow-down-right" size={16} color={colors.green[500]} />
          </View>
        </View>
        <View tw="flex-1 bg-gray-50/50 rounded-2xl p-3 border border-gray-50">
          <Text variant="TextSmall" tw="text-gray-400 font-bold uppercase text-[8px] mb-1 tracking-widest">Removed</Text>
          <View tw="flex-row items-center justify-between">
            <Text variant="TitleSmall" tw="text-gray-900 font-black">{checkedOut}</Text>
            <Icon source="arrow-up-right" size={16} color={colors.orange[500]} />
          </View>
        </View>
      </View>
    </View>
  );
}
