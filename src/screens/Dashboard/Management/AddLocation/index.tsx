import React from 'react';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';

import FormManager, { type FormValues } from './components/FormManager';
import LocationNameModule from './modules/LocationNameModule';
import StepModule from './modules/StepModule';
import StepFactory from './modules/StepFactory';

import { pickFormValues } from './utils';

function AddLocation(props: ManagementRouteProps<'AddLocation'>) {
  const { navigation } = props;

  const { mutate } = useSWRConfig();
  const companyId = useManagementStore(useShallow((store) => store.companyId));

  async function onSubmit(values: FormValues) {
    try {
      const data = pickFormValues(values);
      if (!data) throw new Error();

      await ColdtivateService.addLocation(data);

      await mutate(getQueryKey('getLocations', companyId));
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <FormManager onSubmit={onSubmit}>
      {(handler) => (
        <ScrollView
          contentContainerStyle="flex-1 items-start mt-5 mx-4"
          showsVerticalScrollIndicator={false}
        >
          <LocationNameModule />
          <StepModule />
          <StepFactory />
          <Button tw="w-full mt-6" mode="contained" onPress={handler} icon="plus-circle" uppercase>
            Add
          </Button>
        </ScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(AddLocation);
