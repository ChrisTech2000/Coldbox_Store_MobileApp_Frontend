import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';
import { useApiCache, useLazyApiCall } from '#services/hooks/useAPiCall';
import type { Farmer } from '#types/global';
import { paperTheme } from '#ui/lib/theme';
import { savePDF } from '#ui/lib/pdf';

import { GET_FARMER_RECORD_SWR_KEY } from '../index';
import { CONSTRAINT_EXCEPTIONS, DataLoader, getPdfContent } from '../utils';

export default function FarmerDashboardData(props: { farmerId: number }) {
  const { farmerId } = props;

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const contextualFarmer = useApiCache<number, Farmer>(GET_FARMER_RECORD_SWR_KEY, farmerId);

  const { execute, isLoading } = useLazyApiCall(
    'getFarmerRelatedAnalytics',
    DataLoader.aggregateFarmerData
  );

  return (
    <Button
      tw="w-full mb-4"
      mode="contained"
      icon={isLoading ? undefined : 'check-circle-outline'}
      uppercase
      disabled={isLoading}
      onPress={async (evt): Promise<void> => {
        evt.stopPropagation();
        if (typeof contextualFarmer === 'undefined') {
          toast.show(t('actions.error'), { type: 'md_danger' });
          return;
        }
        try {
          const result = await execute(contextualFarmer);
          if (isEmpty(result)) throw new Error('empty farmer data response');

          await savePDF(getPdfContent(result, t), 'farmer');
          toast.show(`${t('actions.done')}!`, { type: 'md_success' });
        } catch (exception) {
          let toastId: string | undefined;
          if (exception instanceof Error) {
            switch (exception.message) {
              case CONSTRAINT_EXCEPTIONS.NO_CHECK_INS:
                toastId = toast.show(
                  t('Dashboard.Management.EditCoolingUsers.toasts.noCoolingUnits'),
                  { type: 'md_danger' }
                );
                break;
              case CONSTRAINT_EXCEPTIONS.NO_SURVEYS:
                toastId = toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.noSurveys'), {
                  type: 'md_danger',
                });
                break;
              default:
                break;
            }
          }
          if (typeof toastId === 'undefined') toast.show(t('actions.error'), { type: 'md_danger' });
        }
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={paperTheme.colors.outline} />
      ) : (
        t('Dashboard.Management.EditCoolingUsers.actions.downloadFarmers')
      )}
    </Button>
  );
}
