import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles } from '#types/global';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

export function DashboardEmptyState() {
  const { user } = useAuthStore();
  const { company } = useManagementStore();
  const { t } = useTranslationUtils();
  const managementNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const { data, isLoading } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (user?.role === ERoles.EMPLOYEE && !data.length) {
    return (
      <View tw="flex-1 items-center mx-4 mt-4 space-y-4">
        <Text variant="TextBold" tw="text-base text-green-primary text-center">
          {t('Dashboard.noLocationsAvailable')}
        </Text>
        <Button
          mode="contained"
          contentStyle="flex flex-row-reverse"
          labelStyle="text-lg"
          icon="plus-circle-outline"
          onPress={() => managementNavigation.navigate('Management', { screen: 'AddLocation' })}
        >
          {t('navigation.management.AddLocation')}
        </Button>
      </View>
    );
  }

  return (
    <View tw="flex-1 items-center text-center mx-4 mt-4">
      <Text variant="TextBold" tw="text-base text-green-primary text-center">
        {user?.role === ERoles.COOLING_USER
          ? t('Dashboard.emptyCoolingUser')
          : t('Dashboard.emptyGeneral')}
      </Text>
    </View>
  );
}
