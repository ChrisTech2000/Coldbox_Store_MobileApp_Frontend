import React from 'react';
import { View } from 'react-native';
import type { ButtonProps } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { formatCurrencyWithSymbol } from '../utils';

export default function FloatingFooter(props: {
  dailyPriceLabel: string;
  currencyCode: string;
  commonPrice: string;
  totalPrice: string;
  cancelFunc: ButtonProps['onPress'];
  saveFunc: ButtonProps['onPress'];
}) {
  const { t } = useTranslationUtils();

  return (
    <View tw="absolute bottom-0 right-0 w-full">
      <View tw="bg-teal-50 p-4 rounded-sm space-y-1">
        <View tw="flex flex-row items-center justify-between">
          <Text tw="text-lg">{props.dailyPriceLabel}</Text>
          <Text tw="text-lg text-green-primary">
            {formatCurrencyWithSymbol(props.currencyCode, props.commonPrice)}
          </Text>
        </View>
        <View tw="flex flex-row items-center justify-between">
          <Text tw="text-lg">{t('Dashboard.CrateManagement.CheckIn.Setup.totalPriceLabel')}</Text>
          <Text tw="text-lg text-green-primary">
            {formatCurrencyWithSymbol(props.currencyCode, props.totalPrice)}
          </Text>
        </View>
      </View>
      <View tw="pt-4 pb-5 space-x-2 px-4 bg-white flex flex-row items-center justify-evenly border-t-0.5 border-gray-600 border-solid">
        <Button
          mode="outlined"
          tw="flex-1"
          contentStyle="flex flex-row-reverse"
          icon="close-circle-outline"
          onPress={props.cancelFunc}
        >
          {t('actions.cancel')}
        </Button>
        <Button
          mode="contained"
          tw="flex-1"
          contentStyle="flex flex-row-reverse"
          icon="check-circle-outline"
          onPress={props.saveFunc}
        >
          {t('actions.save-changes')}
        </Button>
      </View>
    </View>
  );
}
