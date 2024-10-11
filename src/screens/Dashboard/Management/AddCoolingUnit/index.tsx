import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useManagementStore } from '#stores/management';

import Container from './Container';
import DataAggregator from './contexts/DataAggregator';

function AddCoolingUnit() {
  const company = useManagementStore(useShallow((store) => store.company));

  return (
    <DataAggregator companyId={company?.id}>
      <Container companyId={company?.id} />
    </DataAggregator>
  );
}

export default withSafeArea(AddCoolingUnit, ['bottom'], true);
