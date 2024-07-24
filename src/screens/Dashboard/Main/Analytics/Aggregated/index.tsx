import React, { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ImpactService from '#services/ImpactService';
import { useManagementStore } from '#stores/management';
import { CoolingUnit, EImpactMode } from '#types/global';

import { ConfigurationModal } from '../components/ConfigurationModal';
import { useAnalyticsData } from '../store';

export type ConfigData =
  | {
      startDate: Date;
      endDate: Date;
      coolingUnit: CoolingUnit;
    }
  | undefined;

export function AggregatedSection() {
  const { t } = useTranslationUtils();
  const { coolingUnits } = useAnalyticsData();
  const { company } = useManagementStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [configData, setConfigData] = useState<ConfigData>(undefined);

  const { data: impactData, isLoading: loadingImpactData } = useApiCall(
    'getImpact',
    ImpactService.getImpact,
    {
      companyId: company?.id as number,
      coolingUnitId: configData?.coolingUnit?.id as number,
      startDate: configData?.startDate,
      endDate: configData?.endDate,
      mode: EImpactMode.COOLING_UNIT,
    },
    {
      skip: !company?.id || !configData,
    }
  );

  return (
    <ScrollView tw="mt-8" showsVerticalScrollIndicator={false}>
      {!configData && (
        <View tw="bg-gray-200 px-4 py-2 items-center w-full rounded-lg space-y-2">
          <Text variant="TextMedium" tw="text-lg text-center">
            {t('Dashboard.Analytics.aggregatedTab.configurationMessage')}
          </Text>
          <Button
            mode="contained"
            contentStyle="bg-gray-800"
            icon="cog"
            onPress={() => setIsModalOpen(true)}
          >
            {t('Dashboard.Analytics.aggregatedTab.configureButton')}
          </Button>
        </View>
      )}

      {configData && loadingImpactData ? (
        <View tw="flex-1 items-center justify-center mt-2">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      ) : (
        <View>
          <Text>{impactData?.co2Metrics?.[0]?.companyId}</Text>
        </View>
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
