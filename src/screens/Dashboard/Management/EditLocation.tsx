import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

export default function EditLocation(props: ManagementRouteProps<'EditLocation'>) {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Edit {props.route.params.name} Location</Text>
    </View>
  );
}
