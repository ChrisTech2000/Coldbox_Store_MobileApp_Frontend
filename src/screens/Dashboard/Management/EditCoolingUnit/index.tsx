import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';

import DataAggregator from '../AddCoolingUnit/contexts/DataAggregator';
import Container from './Container';

function EditCoolingUnit(props: ManagementRouteProps<'EditCoolingUnit'>) {
  const company = useManagementStore(useShallow((store) => store.company));

  return (
    <DataAggregator companyId={company?.id}>
      <Container coolingUnitId={props.route.params.coolingUnitId} companyId={company?.id} />
    </DataAggregator>
  );
}

export default withSafeArea(EditCoolingUnit, ['bottom'], true);
