import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

function RegisteredEmployeeDetails(props: ManagementRouteProps<'RegisteredEmployeeDetails'>) {
  const { registeredEmployeeId } = props.route.params;

  const company = useManagementStore(useShallow((store) => store.company));

  const { data, isLoading } = useApiCall(
    'getCompanyEmployee',
    ColdtivateService.getCompanyEmployee,
    { registeredEmployeeId, companyId: company?.id as number },
    {
      skip: !registeredEmployeeId || !company?.id,
      defaultData: undefined,
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}

export default withSafeArea(RegisteredEmployeeDetails);
