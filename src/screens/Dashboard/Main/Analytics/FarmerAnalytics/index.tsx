import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';

import Logo from '#assets/images/coldtivate_logo.svg';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import FarmerImpactService from '#services/FarmerImpactService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';

import { ConfigData, Configuration, ConfigurationModal } from '../components/Configuration';
import { CommonFooter } from '../components/Footer';
import { CratesTab } from './components/CratesTab';
import { ImpactTab } from './components/ImpactTab';
import { InnerTabs, Tab } from './components/InnerTabs';
import { useFarmerAnalyticsData } from './store';

export function FarmerAnalytics() {
  const { user } = useAuthStore();
  const { t } = useTranslationUtils();
  const { configData, setConfigData, setFarmer } = useFarmerAnalyticsData();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

  const { data: farmerResponse, isLoading: loadingFarmers } = useApiCall(
    'getFarmerByUserId',
    ColdtivateService.getFarmerByUserId,
    user!.id,
    {
      skip: !user?.id,
    }
  );

  const { data: coolingUnits, isLoading: loadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    { company: farmerResponse?.[0]?.companies[0] as number }, // TODO: are we supposed to get all?
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

  const onBackToMain = useCallback(() => {
    if (activeTab) {
      setActiveTab(undefined);
    } else {
      setConfigData(null);
    }
  }, [activeTab]);

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
            />

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
                  <Text variant="TextMedium" tw="text-lg text-white">
                    {t(`Dashboard.Analytics.farmersAnalytics.coolingUserName`)}
                  </Text>
                  <Text variant="TextBold" tw="text-lg text-white font-bold">
                    {user?.firstName} {user?.lastName}
                  </Text>
                </View>

                <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                  <Text variant="TextMedium" tw="text-lg text-white">
                    {t(`Dashboard.Analytics.farmersAnalytics.coolingUserType`)}
                  </Text>
                  <Text variant="TextBold" tw="text-lg text-white font-bold">
                    {user?.role}
                  </Text>
                </View>

                <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                  <Text variant="TextMedium" tw="text-lg text-white">
                    {t(`Dashboard.Analytics.farmersAnalytics.avgStorageTime`)}
                  </Text>
                  <Text variant="TextBold" tw="text-lg text-white font-bold">
                    {farmerImpact?.avgStorageDays ?? 0}{' '}
                    {t(`Dashboard.Analytics.farmersAnalytics.days`)}
                  </Text>
                </View>

                <View tw="bg-gray-800 rounded-md px-2 py-1 items-center">
                  <Text variant="TextMedium" tw="text-lg text-white">
                    {t(`Dashboard.Analytics.farmersAnalytics.coldStorageCost`)}
                  </Text>
                  <Text variant="TextBold" tw="text-lg text-white font-bold">
                    {(farmerImpact?.totalStorageCost ?? 0).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <CommonFooter
              tabs={
                <InnerTabs
                  activeTab={activeTab}
                  onTabSelection={(tab: Tab) => setActiveTab(tab)}
                  disabled={!configData}
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
