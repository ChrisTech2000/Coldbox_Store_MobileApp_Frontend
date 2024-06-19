import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

export default function EditCoolingUnit(props: ManagementRouteProps<'EditCoolingUnit'>) {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Edit {props.route.params.unitId} Cooling Unit</Text>
    </View>
  );
}
