import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useManagementStore } from '#stores/management';

import ScreenContainer from './modules/ScreenContainer';
import DataAggregator from './contexts/DataAggregator';

function AddCoolingUnit() {
  const company = useManagementStore(useShallow((store) => store.company));

  return (
    <KeyboardAwareScrollView
      tw="h-full"
      contentContainerStyle="pt-5 pb-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <DataAggregator companyId={company?.id}>
        <ScreenContainer />
      </DataAggregator>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(AddCoolingUnit);
