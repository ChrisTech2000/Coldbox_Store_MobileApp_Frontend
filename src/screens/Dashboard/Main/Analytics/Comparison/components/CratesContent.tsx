import React from 'react';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';

export function CratesContent() {
  return (
    <ScrollView tw="mt-8" showsVerticalScrollIndicator={false}>
      <Text>CRATES</Text>
    </ScrollView>
  );
}
