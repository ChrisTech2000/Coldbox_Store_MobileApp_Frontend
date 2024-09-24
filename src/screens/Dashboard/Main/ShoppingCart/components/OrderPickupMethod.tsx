import React from 'react';
import { View } from 'react-native';
import { Divider, RadioButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import { Text } from '#ui/components/Text';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Touchable } from '#ui/components/Touchable';

import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import DeliveryInformationBottomSheet, {
  type DeliveryInformationDatum,
} from './DeliveryInformationBottomSheet';

// TODO → improve this in the future
type Datum = string;

// TODO → add text content to translations
export default function OrderPickupMethod(props: { onConfirm?: (selected: Datum) => void }) {
  const [selectedItem, setSelectedItem] = React.useState<Datum>('now');

  return (
    <React.Fragment>
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
            <RadioButtonItem label="Pickup today" value="now" tw="flex flex-row-reverse ml-[-10]" />
            <Divider tw="bg-zinc-400" />
            <RadioButtonItem
              label="Keep in storage (€ 0.00 / day)"
              value="later"
              tw="flex flex-row-reverse ml-[-10]"
            />
            <Divider tw="bg-zinc-400" />
            <View tw="flex-row items-center justify-between">
              <RadioButtonItem
                label="Delivery"
                value="delivery"
                tw="flex flex-row-reverse ml-[-10] w-[65%]"
              />
              <Touchable
                tw="p-2"
                onPress={(evt) => {
                  evt.stopPropagation();
                  emitter.emit(APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION, [
                    {
                      companyName: 'Lorem Ipsum',
                      phoneNumber: '+0123456789',
                      produces: [
                        { cropName: 'Banana', weight: 2, code: 'CU05-03' },
                        { cropName: 'Banana', weight: 2, code: 'CU05-03' },
                      ],
                    },
                  ] satisfies Array<DeliveryInformationDatum>);
                }}
              >
                <Text tw="text-base text-green-primary">View contact(s)</Text>
              </Touchable>
            </View>
          </RadioButton.Group>
        </View>
      </View>

      <_PortalsWrapper />
    </React.Fragment>
  );
}

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <DeliveryInformationBottomSheet />
    </React.Fragment>
  );
}
