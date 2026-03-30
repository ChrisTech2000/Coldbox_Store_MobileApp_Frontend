import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { FileUtility } from '#ui/lib/file';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { useApiCall } from '#services/hooks/useAPiCall';
import ImpactService from '#services/ImpactService';
import { useManagementStore } from '#stores/management';
import { EImpactMode, EView } from '#types/global';

import { ConfigData, Configuration, ConfigurationModal } from '../components/Configuration';
import { CommonFooter } from '../components/Footer';
import { useAnalyticsData } from '../store';
import { generatePDFContent } from '../utils/downloadData';
import { CratesContent } from './components/CratesContent';
import { ImpactContent } from './components/ImpactContent';
import { InnerTabs, Tab } from './components/InnerTabs';
import { createSortingStore, SortingMenu } from './components/SortMenu';
import { UsersContent } from './components/UsersContent';
import { useComparisonData } from './store';
import { BackArrowIcon } from '../components/GoBackArrow';

export const useSortingStore = createSortingStore();

const screenHeight = Dimensions.get('window').height;

export function ComparisonSection() {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const toast = InAppNotifications.useToast();
  const coolingUnits = useAnalyticsData((store) => store.coolingUnits);
  const company = useManagementStore((store) => store.company);
  const sorting = useSortingStore?.((store) => store.sorting);
  const { updatedImpactData, configData, setConfigData, setImpactData, setCoolingUnitData } =
    useComparisonData((store) => ({
      configData: store.configData,
      setConfigData: store.setConfigData,
      setImpactData: store.setImpactData,
      setCoolingUnitData: store.setCoolingUnitData,
      updatedImpactData: store.impactData,
    }));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);
  const [isCreatingPdf, setIsCreatingPdf] = useState<boolean>(false);

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

  const onDownloadData = useCallback(async () => {
    if (!updatedImpactData) return;

    setIsCreatingPdf(true);
    const html = generatePDFContent(
      t,
      coolingUnits,
      company,
      coolingUnitData,
      updatedImpactData,
      'comparison',
      configData
    );
    const fileName = `${t('Dashboard.Analytics.companyTab.downloadFileName')}-${t('Dashboard.Analytics.comparison')}`;

    try {
      await FileUtility.createPdfFromHtml(html, fileName);
      toast.show(`${t('actions.done')}!`, { type: 'md_success' });
    } catch (exception) {
      toast.show(t('Dashboard.History.pdfModal.errorMessage'), {
        type: 'md_danger',
      });
      reportCrash(exception as Error, {
        extras: {
          errorContext: 'PDF Generation',
          impactDataPresent: !!updatedImpactData,
          coolingUnitDataPresent: !!coolingUnitData,
          hasImpactData: !!impactData,
        },
      });
    } finally {
      setIsCreatingPdf(false);
    }
  }, [t, toast, coolingUnits, configData, coolingUnitData, updatedImpactData, company]);

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
    <ScrollView tw="mt-8 h-full w-full" showsVerticalScrollIndicator={false}>
      <View tw={screenHeight <= SMALL_SCREEN_THRESHOLD ? 'mb-24' : 'mb-12'}>
        {!configData ? (
          <Configuration openModal={() => setIsModalOpen(true)} />
        ) : (
          <View tw="w-full space-y-4 justify-between">
            <View tw="w-full flex-row justify-between items-center mb-4">
              <TouchableOpacity
                tw="flex flex-row items-center space-x-2"
                onPress={onBackToMain}
              >
                <BackArrowIcon />
                <Text variant="TextMedium" tw="text-base">
                  {t(`Dashboard.Analytics.companyTab.goBackButton`)}
                </Text>
              </TouchableOpacity>

              <View tw="flex-row items-center space-x-2">
                <Button
                  mode="contained"
                  onPress={onDownloadData}
                  icon="download-outline"
                  contentStyle="h-8"
                  labelStyle="text-[10px] h-5"
                  tw="bg-green-primary"
                  disabled={isCreatingPdf}
                >
                  {isCreatingPdf ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    t('Dashboard.Analytics.downloadDataButton')
                  )}
                </Button>

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
                  labelStyle="text-[10px] h-5"
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
              <View tw="items-center mt-2">
                <View tw="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-4 space-y-3 my-2">
                  <View tw="flex-row items-center space-x-3">
                    <View tw="p-2 bg-green-primary/10 rounded-lg">
                      <Icon source="calendar-range" size={20} color={colors.green.primary} />
                    </View>
                    <View tw="flex-1">
                      <Text variant="TextSmall" tw="text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                        {t('Dashboard.Analytics.tabsShared.dateRangeLabel')}
                      </Text>
                      <Text variant="TextMedium" tw="text-sm font-bold text-gray-800">
                        {dateFmt(configData.startDate.toISOString(), 'MMM d, yyyy')} -{' '}
                        {dateFmt(configData.endDate.toISOString(), 'MMM d, yyyy')}
                      </Text>
                    </View>
                  </View>

                  <View tw="h-[1px] bg-gray-50 w-full" />

                  <View tw="flex-row items-center space-x-3">
                    <View tw="p-2 bg-blue-500/10 rounded-lg">
                      <Icon source="coolant-temperature" size={20} color={colors.blue[500]} />
                    </View>
                    <View tw="flex-1">
                      <Text variant="TextSmall" tw="text-gray-400 uppercase tracking-wider text-[10px] font-bold">
                        {t('Dashboard.Analytics.tabsShared.selectedUnitsLabel')}
                      </Text>
                      <Text variant="TextMedium" tw="text-sm font-bold text-gray-800" numberOfLines={1}>
                        {configData.coolingUnits?.map((unit) => unit.name).join(', ')}
                      </Text>
                    </View>
                  </View>
                </View>
                {activeTab === 'users' ? (
                  <UsersContent key="users-content-comparison-section" sorting={sorting} />
                ) : null}
                {activeTab === 'crates' ? (
                  <CratesContent key="crates-content-comparison-section" sorting={sorting} />
                ) : null}
                {activeTab === 'impact' ? (
                  <ImpactContent key="impact-content-comparison-section" sorting={sorting} />
                ) : null}
              </View>
            )}
          </View>
        )}

        {!activeTab ? (
          <CommonFooter
            tabs={
              <InnerTabs
                activeTab={activeTab}
                onTabSelection={(tab: Tab) => setActiveTab(tab)}
                disabled={!configData}
              />
            }
          />
        ) : null}

        <ConfigurationModal
          isOpen={isModalOpen}
          dismiss={() => setIsModalOpen(false)}
          confirm={(config: ConfigData) => setConfigData(config)}
          coolingUnits={coolingUnits}
        />
      </View>
    </ScrollView>
  );
}
