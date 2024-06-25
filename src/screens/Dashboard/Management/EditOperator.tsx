import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import type { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function EditOperator(props: ManagementRouteProps<'EditOperator'>) {
  const { params } = props.route;

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>
        Edit ({params.firstName}, {params.familyName}) Operator
      </Text>
    </View>
  );
}

export default withSafeArea(EditOperator);
