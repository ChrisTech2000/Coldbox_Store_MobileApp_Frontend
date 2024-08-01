import React from 'react';

import { Button } from '#ui/components/Button';

import { useApiCache, useApiCall } from '#services/hooks/useAPiCall';
import type { Farmer } from '#types/global';

import { GET_FARMER_RECORD_SWR_KEY } from '../index';
import { DataLoader } from '../utils';

const SWR_CACHE_KEY = 'getFarmerRelatedEntities';

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

  console.log(data);

  return (
    <Button
      tw="w-full mb-4"
      mode="contained"
      icon="check-circle-outline"
      uppercase
      disabled={isLoading || hasError}
    >
      Download farmer&apos;s dashboard data
    </Button>
  );
}
