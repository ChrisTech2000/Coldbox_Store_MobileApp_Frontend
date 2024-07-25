import React from 'react';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';

export function UsersContent() {
  return (
    <ScrollView tw="mt-8" showsVerticalScrollIndicator={false}>
      <Text>USERS</Text>
    </ScrollView>
  );
}
