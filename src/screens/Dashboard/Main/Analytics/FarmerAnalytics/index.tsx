import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';

import Logo from '#assets/images/coldtivate_logo.svg';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { savePDF } from '#ui/lib/pdf';

import InAppNotifications from '#common/InAppNotifications';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import FarmerImpactService from '#services/FarmerImpactService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { Farmer } from '#types/global';

import { DataLoader, getPdfContent } from '#screens/Dashboard/Management/EditCoolingUser/utils';

import { ConfigData, Configuration, ConfigurationModal } from '../components/Configuration';
import { CommonFooter } from '../components/Footer';
import { CratesTab } from './components/CratesTab';
import { ImpactTab } from './components/ImpactTab';
import { InnerTabs, Tab } from './components/InnerTabs';
import { useFarmerAnalyticsData } from './store';

export function FarmerAnalytics() {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const user = useAuthStore((store) => store.user);
  const { configData, setConfigData, setFarmer } = useFarmerAnalyticsData((store) => ({
    configData: store.configData,
    setConfigData: store.setConfigData,
    setFarmer: store.setFarmer,
  }));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);
  const [isCreatingPdf, setIsCreatingPdf] = useState<boolean>(false);

  const { data: farmerResponse, isLoading: loadingFarmers } = useApiCall(
    'getFarmerByUserId',
    ColdtivateService.getFarmerByUserId,
    user!.id,
    {
      skip: !user?.id,
    }
  );

  const { data: _coolingUnits, isLoading: loadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    { company: farmerResponse?.[0]?.companies[0] as number },
    {
      skip: !farmerResponse?.[0]?.companies[0],
      defaultData: [],
    }
  );

  const { data: farmerImpact, isLoading: loadingFarmerImpact } = useApiCall(
    'getFarmerBaseImpact',
    FarmerImpactService.getFarmerBaseImpact,
    farmerResponse?.[0]?.id as number,
    {
      skip: !farmerResponse?.[0]?.id,
    }
  );

  const { data, isLoading } = useApiCall(
    'getFarmerRelatedEntities',
    useCallback(async (farmer: Farmer) => {
      try {
        return await DataLoader.aggregateFarmerData(farmer);
      } catch (exception) {
        if (exception instanceof Error) {
          if (exception.message === 'farmer does not have any check-ins') {
            toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.noCoolingUnits'), {
              type: 'md_danger',
            });
          }
        }
        throw exception;
      }
    }, []),
    farmerResponse?.[0] as Farmer,
    {
      skip: !farmerResponse,
      defaultData: undefined,
      errorRetryCount: 0,
    }
  );

  const coolingUnits = useMemo(() => {
    return _coolingUnits?.filter((unit) => farmerResponse?.[0].coolingUnits.includes(unit.id));
  }, [_coolingUnits, farmerResponse]);

  const onBackToMain = useCallback(() => {
    if (activeTab) {
      setActiveTab(undefined);
    } else {
      setConfigData(null);
    }
  }, [activeTab]);

  const download = useCallback(async () => {
    if (!data) return;
    setIsCreatingPdf(true);
    try {
      await savePDF(getPdfContent(data, t), 'farmer');
      toast.show(`${t('actions.done')}!`, { type: 'md_success' });
    } catch (exception) {
      setIsCreatingPdf(false);
      console.error(exception);
    } finally {
      setIsCreatingPdf(false);
    }
  }, [data]);

  useEffect(() => {
    if (coolingUnits) {
      setConfigData({
        coolingUnits,
        endDate: new Date(),
        startDate: new Date(2022, 9),
      });
    }
  }, [coolingUnits]);

  useEffect(() => {
    if (farmerResponse?.[0]) {
      setFarmer(farmerResponse[0]);
    }
  }, [farmerResponse]);

  if (loadingFarmers || loadingFarmerImpact || loadingCoolingUnits) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="absolute bottom-0 top-0 pb-1">
      <ScrollView tw="mx-4 mt-4 space-y-4" showsVerticalScrollIndicator={false}>
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
              disabled={!coolingUnits?.length}
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

              {activeTab === 'crates' && <CratesTab />}
              {activeTab === 'impact' && <ImpactTab />}
            </View>
          </View>
        )}

        {!activeTab && (
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
                    {farmerImpact?.avgStorageDays?.[0] ?? 0}{' '}
                    {t(`Dashboard.Analytics.farmersAnalytics.days`)}
                  </Text>
                </View>

                <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                  <Text variant="TextMedium" tw="text-base text-white">
                    {t(`Dashboard.Analytics.farmersAnalytics.coldStorageCost`)}
                  </Text>
                  <Text variant="TextBold" tw="text-base text-white">
                    {(farmerImpact?.totalStorageCost?.['0'] ?? 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <CommonFooter
              tabs={
                <InnerTabs
                  activeTab={activeTab}
                  onTabSelection={(tab: Tab) => setActiveTab(tab)}
                  disabled={!configData || !coolingUnits?.length}
                />
              }
            />
          </View>
        )}

        <ConfigurationModal
          isOpen={isModalOpen}
          dismiss={() => setIsModalOpen(false)}
          confirm={(config: ConfigData) => setConfigData(config)}
          coolingUnits={coolingUnits ?? []}
        />
      </ScrollView>
    </View>
  );
}
