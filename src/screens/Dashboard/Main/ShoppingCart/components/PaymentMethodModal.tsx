import React, { type SetStateAction } from 'react';
import { View } from 'react-native';
import { Modal, Portal, RadioButton } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { useControlledState } from '#ui/hooks/useControlledState';

import { useTranslationUtils } from '#i18n/utils';

// TODO → improve this in the future
type Datum = string;

// TODO → add text content to translations
export default function PaymentMethodModal(props: {
  visible: boolean;
  onChangeVisible: (v: SetStateAction<boolean>) => void;
  paymentMethods: Array<Datum>;
  currentPaymentMethod: Datum;
  onConfirm?: (selected: Datum) => void;
}) {
  const { t } = useTranslationUtils();

  const [visible, onChangeVisible] = useControlledState(props.visible, props.onChangeVisible);
  const [selected, setSelected] = React.useState<Datum>(props.currentPaymentMethod);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => onChangeVisible(false)}>
        <View tw="w-full items-center bg-zinc-50 rounded-3xl w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
          <View tw="items-start space-y-4 my-2.5 w-full">
            <Text variant="TitleMedium">Payment method</Text>
            <RadioButton.Group value={selected} onValueChange={(value) => setSelected(value)}>
              <View tw="space-y-3 mt-4 mb-2">
                {props.paymentMethods.map((item, itemIdx) => (
                  <View
                    key={`payment-method-list-#${itemIdx}`}
                    tw="border border-zinc-300 w-full rounded-xl overflow-hidden bg-white"
                  >
                    <RadioButtonItem label={item} value={item} tw="flex flex-row-reverse w-full" />
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </View>
          <View tw="w-full flex-row items-center justify-between">
            <Button
              tw="w-[48%]"
              mode="outlined"
              onPress={(evt) => {
                evt.stopPropagation();
                onChangeVisible(false);
                setSelected(props.currentPaymentMethod);
              }}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              tw="w-[48%]"
              mode="contained"
              onPress={(evt) => {
                evt.stopPropagation();
                try {
                  props.onConfirm?.(selected);
                } catch (exception) {
                  console.error(exception);
                } finally {
                  onChangeVisible(false);
                }
              }}
            >
              {t('actions.save-changes')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
