import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import { EApiGender } from '#types/global';

import FormManager, { type FormValues } from './components/FormManager';
import GenderField from './modules/GenderField';
import CoolingUnitsField from './modules/CoolingUnitsField';

function EditOperator(props: ManagementRouteProps<'EditOperator'>) {
  const { userId } = props.route.params;

  const formInitialValues = useRef<FormValues | undefined>(undefined);
  const company = useManagementStore(useShallow((store) => store.company));

  const { data: operator, isLoading: isLoadingOperator } = useApiCall(
    'getOperatorByUserId',
    ColdtivateService.getOperatorByUserId,
    userId,
    {
      skip: !userId,
      defaultData: [],
    }
  );

  const { data: coolingUnits, isLoading: isLoadingCoolingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {
      company: company?.id as number,
    },
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  const contextualOperator = operator.at(0);

  const coolingUnitsOptions = useMemo(
    () =>
      coolingUnits?.map((coolingUnit) => ({
        id: coolingUnit.id,
        name: coolingUnit.name,
      })) ?? [],
    [coolingUnits]
  );

  if (isLoadingOperator || isLoadingCoolingUnits) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!formInitialValues.current) {
    const values = {} as FormValues;
    values.gender = contextualOperator?.user.gender || EApiGender.OTHER;
    values.coolingUnits = contextualOperator?.coolingUnits ?? [];
    formInitialValues.current = values;
  }

  return (
    <ScrollView contentContainerStyle="h-full pt-5 space-y-6" showsVerticalScrollIndicator={false}>
      <FormManager onSubmit={async () => undefined} initialValues={formInitialValues.current}>
        {() => (
          <View tw="mx-4 space-y-6">
            <TextInput
              tw="w-full bg-transparent"
              label="First Name"
              mode="outlined"
              value={contextualOperator?.user.firstName}
              disabled
              dense
            />
            <TextInput
              tw="w-full bg-transparent"
              label="Last Name"
              mode="outlined"
              value={contextualOperator?.user.lastName}
              disabled
              dense
            />

            <GenderField />

            <TextInput
              tw="w-full bg-transparent"
              label="Phone Number"
              mode="outlined"
              value={contextualOperator?.user.phone}
              disabled
              dense
            />

            <CoolingUnitsField coolingUnits={coolingUnitsOptions} />
          </View>
        )}
      </FormManager>
    </ScrollView>
  );
}

export default withSafeArea(EditOperator);
