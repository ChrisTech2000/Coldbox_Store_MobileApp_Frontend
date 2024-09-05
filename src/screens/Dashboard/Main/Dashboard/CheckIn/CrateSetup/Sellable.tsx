import React from 'react';
import { View } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';
import { type Control } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import type { SetupSchema } from './index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Sellable(props: { formControl: Control<SetupSchema, unknown> }) {
  // TODO: bind to the form control (register field and add it to zod resolver)

  return (
    <View tw="flex-col">
      <List.Item
        tw="p-0 m-0 mt-3"
        title={undefined}
        left={() => <Text tw="text-base self-center">Sellable</Text>}
        right={() => <Switch value={false} onValueChange={() => undefined} />}
      />
      <Divider tw="bg-gray-400 mt-2" />
    </View>
  );
}
