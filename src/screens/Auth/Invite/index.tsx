import React from 'react';
import { View } from 'react-native';

import type { AuthRouteProps } from '#navigation/Auth';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';

function Invite(props: AuthRouteProps<'Invite'>) {
  const { params } = props.route;

  console.log(params);

  return (
    <View tw="w-full h-full space-y-4">
      <Text>Sign Up invite</Text>
    </View>
  );
}

export default withSafeArea(Invite);
