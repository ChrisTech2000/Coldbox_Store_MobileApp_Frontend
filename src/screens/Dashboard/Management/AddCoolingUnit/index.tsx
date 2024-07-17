import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useManagementStore } from '#stores/management';

import ScreenContainer from './modules/ScreenContainer';
import DataAggregator from './contexts/DataAggregator';

function AddCoolingUnit() {
  const company = useManagementStore(useShallow((store) => store.company));

  return (
    <DataAggregator companyId={company?.id}>
      <ScreenContainer />
    </DataAggregator>
  );
}

export default withSafeArea(AddCoolingUnit);
