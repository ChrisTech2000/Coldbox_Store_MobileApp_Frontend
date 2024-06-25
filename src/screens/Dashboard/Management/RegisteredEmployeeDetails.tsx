import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function RegisteredEmployeeDetails(props: ManagementRouteProps<'RegisteredEmployeeDetails'>) {
  const { params } = props.route;

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>
        <Text>
          Employee ({params.firstName}, {params.familyName}) Details
        </Text>
      </Text>
    </View>
  );
}

export default withSafeArea(RegisteredEmployeeDetails);
