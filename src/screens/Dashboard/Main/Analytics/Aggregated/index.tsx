import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

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
import { BackArrowIcon } from '../components/GoBackArrow';

const screenHeight = Dimensions.get('window').height;

export function AggregatedSection() {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
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
    setIsCreatingPdf(true);

    const html = generatePDFContent(
      t,
      coolingUnits,
      company,
      coolingUnitData,
      updatedImpactData,
      'aggregated',
      configData
    );
    const fileName = `${t('Dashboard.Analytics.companyTab.downloadFileName')}-${t('Dashboard.Analytics.aggregated')}`;

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
          coolingUnitDataPresent: !!coolingUnitData,
          hasCoolingUnits: !!coolingUnits?.length,
          impactDataPresent: !!impactData,
        },
      });
    } finally {
      setIsCreatingPdf(false);
    }
  }, [t, toast, coolingUnits, coolingUnitData, updatedImpactData, company, configData]);

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
    <ScrollView tw="mt-6 h-full" showsVerticalScrollIndicator={false}>
      <View tw={screenHeight <= SMALL_SCREEN_THRESHOLD ? 'mb-24 px-4' : 'mb-12 px-4'}>
        {!configData ? (
          <Animated.View entering={FadeInDown}>
            <Configuration openModal={() => setIsModalOpen(true)} />
          </Animated.View>
        ) : (
          <View tw="space-y-4">
            <View tw="w-full flex-row justify-between items-center py-2">
              <TouchableOpacity
                tw="flex-row items-center space-x-2 py-1"
                onPress={onBackToMain}
              >
                <View tw="bg-white shadow-sm p-2 rounded-full border border-gray-100">
                  <BackArrowIcon />
                </View>
                <Text variant="TextMedium" tw="text-gray-900 font-bold ml-1">
                  {t(`Dashboard.Analytics.companyTab.goBackButton`)}
                </Text>
              </TouchableOpacity>

              <View tw="flex-row items-center space-x-2">
                <TouchableOpacity
                  onPress={onDownloadData}
                  disabled={isCreatingPdf}
                  tw="bg-emerald-500 p-2.5 rounded-full shadow-md shadow-emerald-200"
                >
                  {isCreatingPdf ? (
                    <ActivityIndicator size={20} color="white" />
                  ) : (
                    <Icon source="download" size={20} color="white" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsModalOpen(true)}
                  tw="bg-gray-800 p-2.5 rounded-full shadow-md shadow-gray-400"
                >
                  <Icon source="cog" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View tw="mb-2">
              <InnerTabs
                activeTab={activeTab}
                onTabSelection={(tab: Tab) => setActiveTab(tab)}
                compactMode
              />
            </View>

            {loadingImpactData || loadingCoolingUnitData ? (
              <View tw="flex-1 items-center justify-center mt-10">
                <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
              </View>
            ) : (
              <Animated.View entering={FadeIn} tw="space-y-4">
                <View tw="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <View tw="flex-row items-center space-x-4 mb-4">
                    <View tw="p-2.5 bg-blue-50 rounded-lg justify-center items-center">
                      <Icon source="calendar-range" size={20} color={colors.blue[600]} />
                    </View>
                    <View tw="flex-1">
                      <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                        {t('Dashboard.Analytics.tabsShared.dateRangeLabel')}
                      </Text>
                      <Text variant="TitleMedium" tw="text-gray-900 font-bold text-base">
                        {dateFmt(configData.startDate.toISOString(), 'MMM d')} - {dateFmt(configData.endDate.toISOString(), 'MMM d, yyyy')}
                      </Text>
                    </View>
                  </View>

                  <View tw="h-[1px] bg-gray-100 w-full mb-4" />

                  <View tw="flex-row items-center space-x-4">
                    <View tw="p-2.5 bg-emerald-50 rounded-lg justify-center items-center">
                      <Icon source="fridge" size={20} color={colors.emerald[600]} />
                    </View>
                    <View tw="flex-1">
                      <Text variant="TextSmall" tw="text-gray-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">
                        {t('Dashboard.Analytics.tabsShared.selectedUnitsLabel')}
                      </Text>
                      <Text variant="TitleSmall" tw="text-gray-900 font-bold" numberOfLines={1}>
                        {configData.coolingUnits?.map((unit) => unit.name).join(', ')}
                      </Text>
                    </View>
                  </View>
                </View>

                {activeTab === 'crates' ? <CratesContent /> : null}
                {activeTab === 'users' ? <UsersContent /> : null}
                {activeTab === 'impact' ? (
                  <ImpactContent
                    useStore={useAggregatedData}
                    type="aggregated"
                    occupancy={occupancy}
                    revenue={revenue}
                  />
                ) : null}
              </Animated.View>
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

