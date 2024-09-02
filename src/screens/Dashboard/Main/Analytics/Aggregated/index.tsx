import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { ActivityIndicator, Icon } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ImpactService from '#services/ImpactService';
import { useManagementStore } from '#stores/management';
import { EImpactMode } from '#types/global';

import { ConfigData, Configuration, ConfigurationModal } from '../components/Configuration';
import { CommonFooter } from '../components/Footer';
import { ImpactContent } from '../components/ImpactContent';
import { useAnalyticsData } from '../store';
import { generatePDFContent } from '../utils/downloadData';
import { CratesContent } from './components/CratesContent';
import { InnerTabs, Tab } from './components/InnerTabs';
import { UsersContent } from './components/UserContent';
import { useAggregatedData } from './store';
import InAppNotifications from '#common/InAppNotifications';

export function AggregatedSection() {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { coolingUnits } = useAnalyticsData();
  const { company } = useManagementStore();
  const {
    configData,
    setConfigData,
    setImpactData,
    setCoolingUnitData,
    impactData: updatedImpactData,
  } = useAggregatedData();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  const occupancy = useMemo(() => {
    return Math.round(coolingUnitData?.averageRoomOccupancy?.[0] || 0);
  }, [coolingUnitData]);

  const revenue = useMemo(() => {
    return coolingUnitData?.roomRevenue?.[0] || 0;
  }, [coolingUnitData]);

  const onBackToMain = useCallback(() => {
    if (activeTab) {
      setActiveTab(undefined);
    } else {
      setConfigData(null);
    }
  }, [activeTab]);

  const onDownloadData = useCallback(async () => {
    if (!updatedImpactData) return;

    const html = generatePDFContent(
      t,
      coolingUnits,
      company,
      coolingUnitData,
      updatedImpactData,
      'aggregated'
    );

    const PDFOptions = {
      html,
      fileName: `${t('Dashboard.Analytics.companyTab.downloadFileName')}-${t('Dashboard.Analytics.aggregated')}`,
      directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      base64: true,
    };

    try {
      const file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) throw new Error();
      toast.show(t('Dashboard.History.pdfModal.successMessage'), {
        type: 'md_success',
      });
    } catch {
      toast.show(t('Dashboard.History.pdfModal.errorMessage'), {
        type: 'md_danger',
      });
    }
  }, [t, toast, coolingUnits, coolingUnitData, updatedImpactData, company]);

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
    <ScrollView tw="mt-8 h-full" showsVerticalScrollIndicator={false}>
      {!configData ? (
        <Configuration openModal={() => setIsModalOpen(true)} />
      ) : (
        <View tw="space-y-2">
          <View tw="w-full flex flex-row justify-between items-center mb-2">
            <TouchableOpacity
              tw="flex flex-row items-center space-x-2 justify-start"
              onPress={onBackToMain}
            >
              <Icon source="arrow-left-circle-outline" size={15} />
              <Text variant="TextMedium" tw="text-base">
                {t(`Dashboard.Analytics.companyTab.goBackButton`)}
              </Text>
            </TouchableOpacity>
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
            <View tw="items-center mt-2 space-y-2">
              <Button
                mode="contained"
                uppercase
                onPress={onDownloadData}
                icon="check-circle-outline"
                contentStyle="flex flex-row-reverse"
                tw="w-[50%] mt-2"
              >
                {t('Dashboard.Analytics.downloadDataButton')}
              </Button>

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
                    {configData.coolingUnits?.map((unit) => unit.name).join(', ')}
                  </Text>
                </Text>
              </View>

              {activeTab === 'crates' && <CratesContent />}
              {activeTab === 'users' && <UsersContent />}
              {activeTab === 'impact' && (
                <ImpactContent
                  useStore={useAggregatedData}
                  type="aggregated"
                  occupancy={occupancy}
                  revenue={revenue}
                />
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
