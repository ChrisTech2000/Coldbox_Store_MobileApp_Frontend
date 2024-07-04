import React, { useRef } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';

import { ScrollView } from '#ui/components/ScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

import FormManager, { type FormValues, DEFAULT_VALUES } from './AddLocation/components/FormManager';
import LocationNameModule from './AddLocation/modules/LocationNameModule';
import StepModule from './AddLocation/modules/StepModule';
import StepFactory from './AddLocation/modules/StepFactory';
import { getCountryFullName, pickFormValues } from './AddLocation/utils';

function EditLocation(props: ManagementRouteProps<'EditLocation'>) {
  const { locationId, companyId } = props.route.params;
  const navigation = props.navigation;

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const { mutate } = useSWRConfig();

  const { data, isLoading } = useApiCall(
    'getLocation',
    ColdtivateService.getLocation,
    { locationId, companyId },
    {
      skip: !locationId || !companyId,
      defaultData: undefined,
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating={true} color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  async function onSubmit(values: FormValues) {
    try {
      const data = pickFormValues(values);
      if (!data) throw new Error();

      await ColdtivateService.editLocation({ ...data, locationId });

      await Promise.all([
        mutate(getQueryKey('getLocation', { locationId, companyId })),
        mutate(getQueryKey('getLocations', companyId)),
      ]);
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  if (!formInitialValues.current) {
    const values = { ...DEFAULT_VALUES } as FormValues;
    values.name = data.name;
    values.country = getCountryFullName(data.company.country) ?? '';

    if (data.latitude) {
      values.latitude = data.latitude;
      values.longitude = data.longitude;
    } else {
      values._step = 'address';
      values.city = data.city;
      values.street = data.street;
      values.state = data.state;
      values.zipCode = data.zipCode;
      values.street = data.street;
      values.streetNumber = data.streetNumber ?? '';
    }

    formInitialValues.current = values;
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={formInitialValues.current}>
      {(handler) => (
        <ScrollView
          contentContainerStyle="flex-1 items-start mt-5 mx-4"
          showsVerticalScrollIndicator={false}
        >
          <LocationNameModule />
          <StepModule />
          <StepFactory />
          <Button tw="w-full mt-6" mode="contained" onPress={handler} icon="pencil" uppercase>
            Edit
          </Button>
        </ScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(EditLocation);
