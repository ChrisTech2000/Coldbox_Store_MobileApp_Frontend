import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { ActivityIndicator } from 'react-native-paper';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useApiCache, useApiCall } from '#services/hooks/useAPiCall';
import type { Farmer } from '#types/global';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { GET_FARMER_RECORD_SWR_KEY } from '../index';
import { DataLoader, getPdfContent } from '../utils';

const SWR_CACHE_KEY = 'getFarmerRelatedEntities';

const _ButtonLoader = () => <ActivityIndicator size="small" color={paperTheme.colors.outline} />;

type Props = {
  farmerId: number;
};

export default function FarmerDashboardData(props: Props) {
  const { farmerId } = props;

  const contextualFarmer = useApiCache<number, Farmer>(GET_FARMER_RECORD_SWR_KEY, farmerId);
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const { data, isLoading, hasError } = useApiCall(
    SWR_CACHE_KEY,
    useCallback(async (farmer: Farmer) => {
      try {
        return await DataLoader.aggregateFarmerData(farmer);
      } catch (exception) {
        // intercept
        if (exception instanceof Error) {
          if (exception.message === 'farmer does not have any check-ins') {
            toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.noCoolingUnits'), {
              type: 'md_danger',
            });
          }
        }
        // let it bubble up
        throw exception;
      }
    }, []),
    contextualFarmer!,
    {
      skip: !farmerId || !contextualFarmer?.id,
      defaultData: undefined,
      errorRetryCount: 0,
    }
  );

  return (
    <Button
      tw="w-full mb-4"
      mode="contained"
      icon={isLoading ? undefined : 'check-circle-outline'}
      uppercase
      disabled={isLoading || hasError || isEmpty(data)}
      onPress={async (evt) => {
        evt.stopPropagation();
        if (typeof data === 'undefined') return; // safe guard
        try {
          const file = await RNHTMLtoPDF.convert({
            html: getPdfContent(data, t),
            fileName: 'farmer',
            directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
            base64: true,
          });

          if (!file.filePath) throw new Error();
          toast.show(`${t('actions.done')}!`, {
            type: 'md_success',
          });
        } catch (exception) {
          console.error(exception);
        }
      }}
    >
      {isLoading ? (
        <_ButtonLoader />
      ) : (
        t('Dashboard.Management.EditCoolingUsers.actions.downloadFarmers')
      )}
    </Button>
  );
}
