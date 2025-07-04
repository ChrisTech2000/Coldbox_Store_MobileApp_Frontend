import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Logo from '#assets/images/coldtivate_logo.svg';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { FileUtility } from '#ui/lib/file';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import type { Farmer } from '#types/global';
import { cn } from '#ui/lib/cn';

import {
  CONSTRAINT_EXCEPTIONS,
  DataLoader,
  getPdfContent,
  type AggregateFarmerDataArgs,
} from '#screens/Dashboard/Management/EditCoolingUser/utils';
import { useTranslatedCrops } from '#screens/Dashboard/Management/CompanyDetails/utils';

import {
  ConfigData,
  Configuration,
  ConfigurationModal,
  useAnalyticsConfigCoolingUnitStore,
} from '../components/Configuration';
import { CommonFooter } from '../components/Footer';
import { CratesTab } from './components/CratesTab';
import { ImpactTab } from './components/ImpactTab';
import { InnerTabs, Tab } from './components/InnerTabs';
import { useFarmerAnalyticsData } from './store';
import { useDashboardCompanyStore } from '../../Dashboard';
import { BackArrowIcon } from '../components/GoBackArrow';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

export function FarmerAnalytics() {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const user = useAuthStore((store) => store.user);
  const { configData, setConfigData, setFarmer } = useFarmerAnalyticsData((store) => ({
    configData: store.configData,
    setConfigData: store.setConfigData,
    setFarmer: store.setFarmer,
  }));

  const dashboardSelectedCompany = useDashboardCompanyStore((s) => s.selectedItem?.id);
  const { onSelect: overrideSelectedCoolingUnit, selectedItems: selectedCoolingUnit } =
    useAnalyticsConfigCoolingUnitStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);
  const [isCreatingPdf, setIsCreatingPdf] = useState<boolean>(false);

  const { data: farmerResponse, isLoading: isLoadingFarmers } = useApiCall(
    'getFarmerByUserId',
    ColdtivateService.getFarmerByUserId,
    user!.id,
    { skip: !user?.id, defaultData: [] }
  );

  const { data: cropsResult, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    { skip: !user?.id, defaultData: [] }
  );

  const crops = useTranslatedCrops(cropsResult);

  const { data: companies, isLoading: isLoadingCompanies } = useApiCall(
    'getCompanies',
    ColdtivateService.getCompanies,
    undefined,
    { skip: !user?.id, defaultData: [] }
  );

  const { data, isLoading } = useApiCall(
    'getFarmerAnalyticsAggregatedDatums',
    useCallback(async (datums: AggregateFarmerDataArgs) => {
      try {
        return await DataLoader.aggregateFarmerData(datums);
      } catch (exception) {
        let toastId: string | undefined;
        if (exception instanceof Error) {
          switch (exception.message) {
            case CONSTRAINT_EXCEPTIONS.NO_COMPANY_ASSIGNED:
              toastId = toast.show(t('Dashboard.noCompanyAvailable'), { type: 'md_danger' });
              break;
            default:
              break;
          }
        }
        if (typeof toastId === 'undefined')
          toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
        reportCrash(exception as Error);
      }
    }, []),
    {
      farmer: farmerResponse?.[0] as Farmer,
      crops: crops ?? [],
      companies: companies ?? [],
      dashboardSelectedCompany, // FYK: included for re-run trigger only, not used directly
    },
    {
      skip: !farmerResponse?.length || isLoadingCrops || isLoadingCompanies,
      defaultData: undefined,
      errorRetryCount: 0,
    }
  );

  const onBackToMain = useCallback(() => {
    if (activeTab) {
      setActiveTab(undefined);
    } else {
      setConfigData(null);
    }
  }, [activeTab]);

  const download = useCallback(async () => {
    try {
      setIsCreatingPdf(true);
      if (!data) throw new Error(); // safe guard
      await FileUtility.createPdfFromHtml(getPdfContent(data, t), 'farmer');
      toast.show(`${t('actions.done')}!`, { type: 'md_success' });
    } catch (exception) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(exception as Error, {
        extras: {
          errorContext: 'PDF Generation',
          impactDataPresent: !!data?.stats.aggregatedImpactData,
          coolingUnitDataPresent: !!data?.datums.farmerCoolingUnits.length,
        },
      });
    } finally {
      setIsCreatingPdf(false);
    }
  }, [data]);

  useEffect(() => {
    if (data?.datums?.farmerCoolingUnits) {
      setConfigData({
        coolingUnits: data.datums.farmerCoolingUnits,
        endDate: new Date(data.dateRange.end),
        startDate: new Date(data.dateRange.start),
      });
      if (selectedCoolingUnit.length > 0) {
        const commonCoolingUnits = data.datums.farmerCoolingUnits.filter((unit) =>
          selectedCoolingUnit.some((selected) => selected.id === unit.id)
        );
        overrideSelectedCoolingUnit(
          commonCoolingUnits.length > 0 ? commonCoolingUnits : data.datums.farmerCoolingUnits
        );
      }
    }
  }, [data?.datums?.farmerCoolingUnits]);

  useEffect(() => {
    const datum = farmerResponse?.[0];
    if (typeof datum !== 'undefined') setFarmer(datum);
  }, [farmerResponse]);

  if (isLoadingFarmers || isLoadingCrops || isLoadingCompanies || isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <ScrollView
        tw={cn('flex-1 pt-4 mb-20', HORIZONTAL_SPACING)}
        showsVerticalScrollIndicator={false}
      >
        <View tw="space-y-4 pb-8">
          {!configData ? (
            <Configuration openModal={() => setIsModalOpen(true)} />
          ) : (
            <View tw="space-y-4">
              <View tw="w-full flex flex-row justify-between items-center mb-4">
                <TouchableOpacity
                  tw="flex flex-row items-center space-x-2 justify-start"
                  onPress={onBackToMain}
                >
                  <BackArrowIcon />
                  <Text variant="TextMedium" tw="text-base">
                    {t(`Dashboard.Analytics.companyTab.goBackButton`)}
                  </Text>
                </TouchableOpacity>
                <View tw="flex flex-row space-x-1">
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
                disabled={!data?.datums?.farmerCoolingUnits?.length}
              />

              <View tw="items-center">
                <Button
                  mode="contained"
                  uppercase
                  onPress={download}
                  icon={isCreatingPdf ? '' : 'check-circle-outline'}
                  contentStyle="flex flex-row-reverse"
                  tw="w-[50%] mb-4"
                  disabled={isLoading || isCreatingPdf}
                >
                  {isCreatingPdf ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    t('Dashboard.Analytics.downloadDataButton')
                  )}
                </Button>

                <View tw="w-full bg-green-transparency rounded-lg px-2 py-1">
                  <Text variant="TextMedium" tw="text-base">
                    {t('Dashboard.Analytics.tabsShared.dateRangeLabel')}{' '}
                    <Text variant="TextMedium" tw="text-base text-green-primary">
                      {dateFmt(configData.startDate.toISOString(), 'MMMM d, yyyy')} -{' '}
                      {dateFmt(configData.endDate.toISOString(), 'MMMM d, yyyy')}
                    </Text>
                  </Text>
                  <Text variant="TextMedium" tw="text-base">
                    {t('Dashboard.Analytics.tabsShared.selectedUnitsLabel')}{' '}
                    <Text variant="TextMedium" tw="text-base text-green-primary">
                      {configData.coolingUnits?.map((unit) => unit.name).join(', ') ?? ''}
                    </Text>
                  </Text>
                </View>

                {activeTab === 'crates' ? <CratesTab /> : null}
                {activeTab === 'impact' ? <ImpactTab /> : null}
              </View>
            </View>
          )}

          {!activeTab ? (
            <View>
              <View tw="bg-gray-200 rounded-lg py-2 items-center">
                <Logo width={50} height={50} tw="mb-4" />
                <View tw="flex flex-row flex-wrap items-center justify-center space-x-2 space-y-2">
                  <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                    <Text variant="TextMedium" tw="text-base text-white">
                      {t(`Dashboard.Analytics.farmersAnalytics.coolingUserName`)}
                    </Text>
                    <Text variant="TextBold" tw="text-base text-white">
                      {user?.firstName} {user?.lastName}
                    </Text>
                  </View>

                  <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                    <Text variant="TextMedium" tw="text-base text-white">
                      {t(`Dashboard.Analytics.farmersAnalytics.coolingUserType`)}
                    </Text>
                    <Text variant="TextBold" tw="text-base text-white">
                      {user?.role}
                    </Text>
                  </View>

                  <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                    <Text variant="TextMedium" tw="text-base text-white">
                      {t(`Dashboard.Analytics.farmersAnalytics.avgStorageTime`)}
                    </Text>
                    <Text variant="TextBold" tw="text-base text-white">
                      {data?.farmerInfo?.avgStorageDays?.[0] ?? 0}{' '}
                      {t(`Dashboard.Analytics.farmersAnalytics.days`)}
                    </Text>
                  </View>

                  <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                    <Text variant="TextMedium" tw="text-base text-white">
                      {t(`Dashboard.Analytics.farmersAnalytics.coldStorageCost`)}
                    </Text>
                    <Text variant="TextBold" tw="text-base text-white">
                      {(data?.farmerInfo?.totalStorageCost?.['0'] ?? 0).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              <CommonFooter
                tabs={
                  <InnerTabs
                    activeTab={activeTab}
                    onTabSelection={(tab: Tab) => setActiveTab(tab)}
                    disabled={!configData || !data?.datums?.farmerCoolingUnits?.length}
                  />
                }
              />
            </View>
          ) : null}
        </View>
      </ScrollView>

      <ConfigurationModal
        isOpen={isModalOpen}
        dismiss={() => setIsModalOpen(false)}
        confirm={(config: ConfigData) => setConfigData(config)}
        coolingUnits={data?.datums?.farmerCoolingUnits ?? []}
      />
    </React.Fragment>
  );
}
