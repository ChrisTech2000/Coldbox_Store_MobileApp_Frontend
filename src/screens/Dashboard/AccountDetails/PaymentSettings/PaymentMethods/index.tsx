import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { PaymentSettingsRoutes } from '#navigation/Dashboard/AccountDetails/PaymentSettingsStack';
import CreditCardStack from './components/CreditCardStack';

const FAKE_CARDS = [
  {
    number: '8234 1234 0000 0329',
    predefined: true,
    brand: 'VISA',
    details: {
      owner: 'Pedrito Mojito',
      expirationDate: new Date('2024-10-23'),
    },
  },
  {
    number: '8234 0978 1782 2903',
    brand: 'Mastercard',
    details: {
      owner: 'Pedrito Mojito',
      expirationDate: new Date('2026-11-20'),
    },
  },
];

function PaymentMethods() {
  const { t } = useTranslationUtils();
  const navigation = useNavigation<NativeStackNavigationProp<PaymentSettingsRoutes>>();

  return (
    <ScrollView tw="flex-1 p-3 h-full" showsVerticalScrollIndicator={false}>
      <View tw="flex flex-row justify-between items-center">
        <Text tw="text-base font-bold text-green-primary">
          {t('Dashboard.AccountDetails.PaymentSettings.cards')}
        </Text>
        <Button labelStyle="text-base" onPress={() => navigation.navigate('AddCard')}>
          + {t('actions.add')}
        </Button>
      </View>

      <CreditCardStack cards={FAKE_CARDS} />
    </ScrollView>
  );
}

export default withSafeArea(PaymentMethods);
