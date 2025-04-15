import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { DashboardRoutes } from '#navigation/Dashboard';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles } from '#types/global';
import { paperTheme } from '#ui/lib/theme';
import RBAC from '#common/RBAC';
import { cn } from '#ui/lib/cn';

export function DashboardEmptyState() {
  const managementNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();
  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();
  const { user } = useAuthStore();
  const { company } = useManagementStore();

  const { data: locations, isLoading } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id as number,
    { skip: !company?.id, defaultData: [] }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const isRTL = LanguageManager.isRTL;

  if (user?.role === ERoles.EMPLOYEE && !locations.length) {
    return (
      <View tw="flex-1 items-center mx-4 mt-4 space-y-4">
        <Text
          variant="TextBold"
          tw={cn('text-base text-green-primary text-center', isRTL && 'text-left')}
        >
          {t('Dashboard.noLocationsAvailable')}
        </Text>
        <Button
          mode="contained"
          contentStyle="flex flex-row-reverse"
          labelStyle="text-lg"
          icon="plus-circle-outline"
          onPress={(evt) => {
            evt.stopPropagation();
            managementNavigation.navigate('Management', { screen: 'AddLocation' });
          }}
        >
          {t('navigation.management.AddLocation')}
        </Button>
      </View>
    );
  }

  if (user?.role === ERoles.COOLING_USER && guard('VIEW', 'MarketplaceListing')) {
    return (
      <View tw="flex-1 items-center mx-4 mt-4">
        <Text
          variant="TextBold"
          tw={cn('text-base text-green-primary text-center', isRTL && 'text-left')}
        >
          {t('Dashboard.coolingUserNavigateToMarketplace')}
        </Text>
      </View>
    );
  }

  return (
    <View tw={cn('flex-1 items-center mx-4 mt-4', isRTL && 'items-start')}>
      <Text variant="TextBold" tw="text-base text-green-primary">
        {user?.role === ERoles.COOLING_USER
          ? t('Dashboard.emptyCoolingUser')
          : t('Dashboard.emptyGeneral')}
      </Text>
    </View>
  );
}
