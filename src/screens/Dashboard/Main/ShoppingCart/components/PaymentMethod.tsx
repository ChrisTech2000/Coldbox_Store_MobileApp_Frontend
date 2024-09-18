import React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import PaymentMethodModal from './PaymentMethodModal';

// TODO → add text content to translations
export default function PaymentMethod() {
  const { t } = useTranslationUtils();

  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <View tw="flex-col space-y-3">
        <View tw="flex-row items-center justify-between">
          <Text tw="text-base text-green-primary font-bold">Payment method</Text>
          <Button
            labelStyle="font-semibold text-base"
            mode="text"
            onPress={(evt) => {
              evt.stopPropagation();
              setIsVisible(true);
            }}
          >
            {t('actions.edit')}
          </Button>
        </View>

        <View tw="justify-center border border-solid border-zinc-300 rounded-xl px-4 h-14">
          <Text tw="text-lg font-bold">VISA ****0329</Text>
        </View>

        <Text tw="text-base">
          Have a discount coupon? <Text tw="text-green-primary">Redeem code</Text>
        </Text>

        <View tw="flex-row items-center space-x-2">
          <Checkbox status="checked" />
          <Text tw="text-base">
            I accept the <Text tw="text-green-primary">terms & conditions</Text>.
          </Text>
        </View>
      </View>

      <PaymentMethodModal
        visible={isVisible}
        onChangeVisible={setIsVisible}
        currentPaymentMethod="VISA ****0329"
        paymentMethods={['VISA ****0329', 'VISA ****4712', 'VISA ****3816']}
        onConfirm={console.log}
      />
    </React.Fragment>
  );
}
