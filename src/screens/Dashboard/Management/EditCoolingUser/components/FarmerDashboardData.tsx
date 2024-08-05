import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';

import { Button } from '#ui/components/Button';

import type { Farmer } from '#types/global';
import { useApiCache, useApiCall } from '#services/hooks/useAPiCall';
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

  const { data, isLoading, hasError } = useApiCall(
    SWR_CACHE_KEY,
    DataLoader.aggregateFarmerData,
    contextualFarmer!,
    {
      skip: !farmerId || !contextualFarmer?.id,
      defaultData: undefined,
    }
  );

  function downloadData() {
    // TODO: download PDF
    Clipboard.setString(getPdfContent(data));
  }

  return (
    <Button
      tw="w-full mb-4"
      mode="contained"
      icon={isLoading ? undefined : 'check-circle-outline'}
      uppercase
      disabled={isLoading || hasError}
      onPress={downloadData}
    >
      {isLoading ? <_ButtonLoader /> : "Download farmer's dashboard data"}
    </Button>
  );
}
