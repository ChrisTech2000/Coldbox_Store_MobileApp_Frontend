import React from 'react';
import { Platform } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { Button } from '#ui/components/Button';

import type { Farmer } from '#types/global';
import { useApiCache, useApiCall } from '#services/hooks/useAPiCall';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

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

  const { data, isLoading, hasError } = useApiCall(
    SWR_CACHE_KEY,
    DataLoader.aggregateFarmerData,
    contextualFarmer!,
    {
      skip: !farmerId || !contextualFarmer?.id,
      defaultData: undefined,
    }
  );

  return (
    <Button
      tw="w-full mb-4"
      mode="contained"
      icon={isLoading ? undefined : 'check-circle-outline'}
      uppercase
      disabled={isLoading || hasError}
      onPress={async (evt) => {
        evt.stopPropagation();
        try {
          const file = await RNHTMLtoPDF.convert({
            html: getPdfContent(data, t),
            fileName: 'farmer',
            directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
            base64: true,
          });
          if (!file.filePath) throw new Error();
        } catch (exception) {
          console.error(exception);
        }
      }}
    >
      {isLoading ? <_ButtonLoader /> : "Download farmer's dashboard data"}
    </Button>
  );
}
