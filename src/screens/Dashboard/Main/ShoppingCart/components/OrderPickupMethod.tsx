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
import { useTranslationUtils } from '#i18n/utils';

// TODO → improve this in the future
type Datum = string;

export default function OrderPickupMethod(props: { onConfirm?: (selected: Datum) => void }) {
  const { t } = useTranslationUtils();

  const [selectedItem, setSelectedItem] = React.useState<Datum>('now');

  return (
    <React.Fragment>
      <View tw="flex-col space-y-5">
        <Text tw="text-base text-green-primary font-bold">
          {t('Dashboard.ShoppingCart.pickupMethods')}
        </Text>
        <View tw="flex-col border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
          <RadioButton.Group
            value={selectedItem}
            onValueChange={(value) => {
              setSelectedItem(value);
              props.onConfirm?.(value);
            }}
          >
            <RadioButtonItem
              label={t('Dashboard.ShoppingCart.pickUpToday')}
              value="now"
              tw="flex flex-row-reverse ml-[-10]"
            />
            <Divider tw="bg-zinc-400" />
            <RadioButtonItem
              label={t('Dashboard.ShoppingCart.keepInStorageDailyRate', { price: '$3.00' })} // TODO: see if rate is fixed or daily
              value="later"
              tw="flex flex-row-reverse ml-[-10]"
            />
            <Divider tw="bg-zinc-400" />
            <View tw="flex-row items-center justify-between">
              <RadioButtonItem
                label={t('Dashboard.ShoppingCart.delivery')}
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
                    },
                  ] satisfies Array<DeliveryInformationDatum>);
                }}
              >
                <Text tw="text-base text-green-primary">
                  {t('Dashboard.ShoppingCart.viewContacts')}
                </Text>
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
