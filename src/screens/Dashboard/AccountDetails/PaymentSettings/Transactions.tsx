import React from 'react';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

function Transactions() {
  return (
    <ScrollView tw="flex-1 p-3" showsVerticalScrollIndicator={false}>
      <Text tw="text-base self-center">HAHAHAHAHAHAHAHAHAH</Text>
    </ScrollView>
  );
}

export default withSafeArea(Transactions);
