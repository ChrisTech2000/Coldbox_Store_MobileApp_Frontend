import React from 'react';
import { View, Text } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ProcessedNotifications } from '../lib/notifications';

type Props = {
  notifications: ProcessedNotifications['notifications'];
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
