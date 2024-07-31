import React from 'react';

import { Button } from '#ui/components/Button';

import { useApiCache, useApiCall } from '#services/hooks/useAPiCall';
import type { Farmer } from '#types/global';

import { GET_FARMER_RECORD_SWR_KEY } from '../index';
import { CoolingUserLoader } from '../utils';

const SWR_CACHE_KEY = 'getFarmerRelatedEntities';

type Props = {
  farmerId: number;
};

export default function FarmerDashboardData(props: Props) {
  const { farmerId } = props;

  const contextualFarmer = useApiCache<number, Farmer>(GET_FARMER_RECORD_SWR_KEY, farmerId);

  const { data, isLoading } = useApiCall(
    SWR_CACHE_KEY,
    async () => {
      try {
        if (!contextualFarmer) return undefined; // safe guard

        const { farmerCompanies, contextualCompanyId } =
          await CoolingUserLoader.loadFarmerInfoAndCompanies(contextualFarmer);

        // TODO: improve this return
        if (!(farmerCompanies.length >= 1)) return contextualFarmer;

        const { farmerCoolingUnits } = await CoolingUserLoader.loadFarmerCoolingUnits(
          contextualFarmer,
          contextualCompanyId
        );

        if (!(farmerCoolingUnits.length >= 1)) {
          // TODO: show toast notification -> no cooling units assigned to the user and/or he doesn't have any check-ins
        }

        const { farmerSlice, impactSlice } =
          await CoolingUserLoader.loadFarmerAnalytics(contextualFarmer);

        console.log(farmerSlice, impactSlice);

        return contextualFarmer;
      } catch (exception) {
        console.error(exception);
      }
    },
    undefined,
    {
      skip: !farmerId || !contextualFarmer?.id,
      defaultData: undefined,
    }
  );

  return (
    <Button
      tw="w-full mb-4"
      mode="contained"
      icon="check-circle-outline"
      uppercase
      disabled={isLoading || !data?.id}
    >
      Download farmer&apos;s dashboard data ({farmerId})
    </Button>
  );
}
