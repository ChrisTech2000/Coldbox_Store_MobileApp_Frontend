import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { Button } from '#ui/components/Button';

import type { Farmer } from '#types/global';
import { useApiCache, useApiCall } from '#services/hooks/useAPiCall';
import { paperTheme } from '#ui/lib/theme';

import { GET_FARMER_RECORD_SWR_KEY } from '../index';
import { DataLoader } from '../utils';

const SWR_CACHE_KEY = 'getFarmerRelatedEntities';

const _ButtonLoader = () => <ActivityIndicator size="small" color={paperTheme.colors.outline} />;

type Props = {
  farmerId: number;
};

export default function FarmerDashboardData(props: Props) {
  const { farmerId } = props;

  const contextualFarmer = useApiCache<number, Farmer>(GET_FARMER_RECORD_SWR_KEY, farmerId);

  const { isLoading, hasError } = useApiCall(
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
    >
      {isLoading ? <_ButtonLoader /> : "Download farmer's dashboard data"}
    </Button>
  );
}
