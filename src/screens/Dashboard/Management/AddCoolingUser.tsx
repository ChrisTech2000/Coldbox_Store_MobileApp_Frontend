import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

function AddCoolingUser(props: ManagementRouteProps<'AddCoolingUser'>) {
  const { userId } = props.route.params;

  const { data, isLoading } = useApiCall(
    'getFarmer',
    ColdtivateService.getFarmer,
    { userId },
    {
      skip: !userId,
      defaultData: [],
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  console.log(data?.at(0));

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Add Cooling User Screen</Text>
    </View>
  );
}

export default withSafeArea(AddCoolingUser);
