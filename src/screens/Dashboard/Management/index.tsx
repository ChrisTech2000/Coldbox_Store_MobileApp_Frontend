import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';

export default function ManagementRoot(props: ManagementRouteProps<'Root'>) {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Button
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          props.navigation.navigate('CompanyDetails');
        }}
      >
        Go to Company Details
      </Button>
      <Button
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          props.navigation.navigate('Locations');
        }}
      >
        Go to Locations
      </Button>
    </View>
  );
}
