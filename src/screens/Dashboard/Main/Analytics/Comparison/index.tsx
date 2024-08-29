import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ImpactService from '#services/ImpactService';
import { useManagementStore } from '#stores/management';
import { EImpactMode, EView } from '#types/global';

import { ConfigData, Configuration, ConfigurationModal } from '../components/Configuration';
import { CommonFooter } from '../components/Footer';
import { useAnalyticsData } from '../store';
import { CratesContent } from './components/CratesContent';
import { ImpactContent } from './components/ImpactContent';
import { InnerTabs, Tab } from './components/InnerTabs';
import { createSortingStore, SortingMenu } from './components/SortMenu';
import { UsersContent } from './components/UsersContent';
import { useComparisonData } from './store';

export const useSortingStore = createSortingStore();

export function ComparisonSection() {
  const { t } = useTranslationUtils();
  const coolingUnits = useAnalyticsData((store) => store.coolingUnits);
  const company = useManagementStore((store) => store.company);
  const sorting = useSortingStore?.((store) => store.sorting);
  const { configData, setConfigData, setImpactData, setCoolingUnitData } = useComparisonData(
    (store) => ({
      configData: store.configData,
      setConfigData: store.setConfigData,
      setImpactData: store.setImpactData,
      setCoolingUnitData: store.setCoolingUnitData,
    })
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

  const { data: impactData, isLoading: loadingImpactData } = useApiCall(
    'getImpact',
    ImpactService.getImpact,
    {
      companyId: company?.id as number,
      coolingUnitId: configData?.coolingUnits?.map((unit) => unit.id) as number[],
      startDate: configData?.startDate,
      endDate: configData?.endDate,
      mode: EImpactMode.COOLING_UNIT,
      view: EView.COMPARISON,
    },
    {
      skip: !company?.id || !configData,
    }
  );

  const { data: coolingUnitData, isLoading: loadingCoolingUnitData } = useApiCall(
    'getCoolingUnitImpact',
    ImpactService.getCoolingUnitImpact,
    {
      unitIds: configData?.coolingUnits?.map((unit) => unit.id) as number[],
      startDate: configData?.startDate,
      endDate: configData?.endDate,
    },
    {
      skip: !configData,
    }
  );

  const onBackToMain = useCallback(() => {
    if (activeTab) {
      setActiveTab(undefined);
    } else {
      setConfigData(null);
    }
  }, [activeTab]);

  useEffect(() => {
    if (impactData) {
      const impactDataClone = cloneDeep(impactData);
      const metrics = Array.isArray(impactData.impactMetrics)
        ? impactData.impactMetrics
        : [impactData.impactMetrics];
      impactDataClone.impactMetrics = metrics;
      setImpactData(impactDataClone);
    }
  }, [impactData]);

  useEffect(() => {
    if (coolingUnitData) {
      setCoolingUnitData(coolingUnitData);
    }
  }, [coolingUnitData]);

  return (
    <ScrollView tw="mt-8" showsVerticalScrollIndicator={false}>
      {!configData ? (
        <Configuration openModal={() => setIsModalOpen(true)} />
      ) : (
        <View tw="space-y-4">
          <View tw="w-full flex flex-row justify-between items-center mb-4">
            <TouchableOpacity
              tw="flex flex-row items-center space-x-2 justify-start"
              onPress={onBackToMain}
            >
              <Icon source="arrow-left-circle-outline" size={15} />
              <Text variant="TextMedium" tw="text-base">
                {t(`Dashboard.Analytics.companyTab.goBackButton`)}
              </Text>
            </TouchableOpacity>
            <View tw="flex flex-row space-x-1">
              <SortingMenu
                isModalVisible={isSortModalOpen}
                setIsModalVisible={setIsSortModalOpen}
                useSortingStore={useSortingStore}
              />
              <Button
                mode="contained"
                contentStyle="bg-gray-800 h-8"
                icon="cog"
                onPress={() => setIsModalOpen(true)}
                labelStyle="h-5"
              >
                {t('Dashboard.Analytics.tabsShared.configureButton')}
              </Button>
            </View>
          </View>

          <InnerTabs
            activeTab={activeTab}
            onTabSelection={(tab: Tab) => setActiveTab(tab)}
            compactMode
          />

          {loadingImpactData || loadingCoolingUnitData ? (
            <View tw="flex-1 items-center justify-center mt-2">
              <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
            </View>
          ) : (
            <View tw="items-center">
              <View tw="w-full bg-green-transparency rounded-lg px-2 py-1">
                <Text variant="TextMedium" tw="text-base font-bold">
                  {t('Dashboard.Analytics.tabsShared.dateRangeLabel')}{' '}
                  <Text variant="TextMedium" tw="text-base font-bold text-green-primary">
                    {dateFmt(configData.startDate.toISOString(), 'MMMM d, yyyy')} -{' '}
                    {dateFmt(configData.endDate.toISOString(), 'MMMM d, yyyy')}
                  </Text>
                </Text>
                <Text variant="TextMedium" tw="text-base font-bold">
                  {t('Dashboard.Analytics.tabsShared.selectedUnitsLabel')}{' '}
                  <Text variant="TextMedium" tw="text-base font-bold text-green-primary">
                    {configData.coolingUnits.map((unit) => unit.name).join(', ')}
                  </Text>
                </Text>
              </View>
              {activeTab === 'users' && (
                <UsersContent key="users-content-comparison-section" sorting={sorting} />
              )}
              {activeTab === 'crates' && (
                <CratesContent key="crates-content-comparison-section" sorting={sorting} />
              )}
              {activeTab === 'impact' && (
                <ImpactContent key="impact-content-comparison-section" sorting={sorting} />
              )}
            </View>
          )}
        </View>
      )}

      {!activeTab && (
        <CommonFooter
          tabs={
            <InnerTabs
              activeTab={activeTab}
              onTabSelection={(tab: Tab) => setActiveTab(tab)}
              disabled={!configData}
            />
          }
        />
      )}

      <ConfigurationModal
        isOpen={isModalOpen}
        dismiss={() => setIsModalOpen(false)}
        confirm={(config: ConfigData) => setConfigData(config)}
        coolingUnits={coolingUnits}
      />
    </ScrollView>
  );
}
