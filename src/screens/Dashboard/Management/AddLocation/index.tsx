import React, { useRef } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type FormValues, DEFAULT_VALUES } from './components/FormManager';
import LocationNameModule from './modules/LocationNameModule';
import StepModule from './modules/StepModule';
import StepFactory from './modules/StepFactory';

import { getCountryFullName, pickFormValues } from './utils';

function AddLocation(props: ManagementRouteProps<'AddLocation'>) {
  const { navigation } = props;

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const { t } = useTranslationUtils();

  const { mutate } = useSWRConfig();
  const company = useManagementStore(useShallow((store) => store.company));

  async function onSubmit(values: FormValues) {
    try {
      const data = pickFormValues(values);
      if (!data) throw new Error();

      await ColdtivateService.addLocation(data);

      await mutate(getQueryKey('getLocations', company?.id));
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  if (!formInitialValues.current) {
    const values = { ...DEFAULT_VALUES } as FormValues;
    values.country = getCountryFullName(company?.country) ?? '';
    formInitialValues.current = values;
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
      {(handler, isSubmitting) => (
        <ScrollView
          contentContainerStyle="flex-1 items-start mt-5 mx-4"
          showsVerticalScrollIndicator={false}
        >
          <LocationNameModule />
          <StepModule />
          <StepFactory />
          <Button
            tw="w-full mt-6"
            mode="contained"
            onPress={handler}
            icon={isSubmitting ? undefined : 'plus-circle'}
            uppercase
          >
            {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
          </Button>
        </ScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(AddLocation);
