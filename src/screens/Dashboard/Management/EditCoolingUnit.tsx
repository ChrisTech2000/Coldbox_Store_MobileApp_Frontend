import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function EditCoolingUnit(props: ManagementRouteProps<'EditCoolingUnit'>) {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Edit {props.route.params.coolingUnitId} Cooling Unit</Text>
    </View>
  );
}

export default withSafeArea(EditCoolingUnit);
