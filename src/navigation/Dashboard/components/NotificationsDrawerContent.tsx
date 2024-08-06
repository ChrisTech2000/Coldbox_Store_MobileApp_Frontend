import React from 'react';
import { View, Text } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { GetNotificationsResponse } from '#types/api.responses';

type Props = {
  notifications: GetNotificationsResponse;
};

function NotificationsDrawerContent(props: Props) {
  const { notifications } = props;

  return (
    <View>
      <Text>{JSON.stringify(notifications, null, 2)}</Text>
    </View>
  );
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom']);
