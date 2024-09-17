import React from 'react';
import { View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { RadioButtonItem } from '#ui/components/RadioButton';

// TODO → improve this in the future
type Datum = string;

// TODO → add text content to translations
export default function OrderPickupMethod(props: { onConfirm?: (selected: Datum) => void }) {
  const [selectedItem, setSelectedItem] = React.useState<Datum>('now');

  return (
    <View tw="flex-col space-y-5">
      <Text tw="text-base text-green-primary font-bold">Pickup method</Text>
      <View tw="flex-col border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
        <RadioButton.Group
          value={selectedItem}
          onValueChange={(value) => {
            setSelectedItem(value);
            props.onConfirm?.(value);
          }}
        >
          <RadioButtonItem label="Today" value="now" tw="flex flex-row-reverse ml-[-10]" />
          <Divider tw="bg-zinc-400" />
          <RadioButtonItem
            label="Keep in storage (€ 0.00 / day)"
            value="later"
            tw="flex flex-row-reverse ml-[-10]"
          />
        </RadioButton.Group>
      </View>
    </View>
  );
}
