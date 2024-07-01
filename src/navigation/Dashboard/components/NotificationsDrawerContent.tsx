import React from 'react';
import { View, Text } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

function NotificationsDrawerContent() {
  return (
    <View>
      <Text>Notifications Drawer Content</Text>
    </View>
  );
}

export default withSafeArea(NotificationsDrawerContent, ['top', 'bottom']);
