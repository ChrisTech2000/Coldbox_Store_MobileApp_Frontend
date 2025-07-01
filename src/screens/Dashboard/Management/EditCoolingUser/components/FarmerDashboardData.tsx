import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';
import { useApiCache, useApiCall, useLazyApiCall } from '#services/hooks/useAPiCall';
import type { Farmer } from '#types/global';
import { paperTheme } from '#ui/lib/theme';
import { FileUtility } from '#ui/lib/file';
import ColdtivateService from '#services/ColdtivateService';
import reportCrash from '#ui/lib/reportCrash';

import { GET_FARMER_RECORD_SWR_KEY } from '../index';
import { CONSTRAINT_EXCEPTIONS, DataLoader, getPdfContent } from '../utils';
import { useTranslatedCrops } from '../../CompanyDetails/utils';

export default function FarmerDashboardData(props: { farmerId: number }) {
  const { farmerId } = props;

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const contextualFarmer = useApiCache<number, { farmer: Farmer }>(
    GET_FARMER_RECORD_SWR_KEY,
    farmerId
  );

  const { data: cropsResult, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      skip: typeof contextualFarmer === 'undefined',
      defaultData: [],
    }
  );

  const crops = useTranslatedCrops(cropsResult);

  const { data: companies, isLoading: isLoadingCompanies } = useApiCall(
    'getCompanies',
    ColdtivateService.getCompanies,
    undefined,
    { skip: typeof contextualFarmer === 'undefined', defaultData: [] }
  );

  const { execute, isLoading: isLoadingAnalytics } = useLazyApiCall(
    'getFarmerRelatedAnalytics',
    DataLoader.aggregateFarmerData
  );

  const isLoading = isLoadingCrops || isLoadingCompanies || isLoadingAnalytics;

  return (
    <Button
      tw="w-full mb-4"
      mode="contained"
      icon={isLoading ? undefined : 'check-circle-outline'}
      uppercase
      disabled={isLoading}
      onPress={async (evt): Promise<void> => {
        evt.stopPropagation();
        try {
          if (typeof contextualFarmer === 'undefined') throw new Error(); // safe guard

          const result = await execute({
            farmer: contextualFarmer.farmer,
            crops: crops ?? [],
            companies: companies ?? [],
          });
          if (isEmpty(result)) throw new Error('empty farmer data response');

          await FileUtility.createPdfFromHtml(getPdfContent(result, t), 'farmer');
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
          if (typeof toastId === 'undefined')
            toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
          reportCrash(exception as Error, {
            extras: {
              hasFarmerDatums: !!contextualFarmer,
              hasCrops: !isEmpty(crops),
              hasCompanies: !isEmpty(companies),
            },
          });
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
