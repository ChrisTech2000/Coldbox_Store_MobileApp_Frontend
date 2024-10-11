import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { Text } from './Text';

// TODO: have design take a look at this
export function GenericError() {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();

  return (
    <View tw="flex-1 items-center mt-[50%] w-full space-y-2">
      <Icon source="information" size={50} color={colors.red[800]} />
      <Text tw="text-red-800 font-bold text-base">{t('navigation.error.errorMessage')}</Text>
      <Text tw="text-red-800 text-base font-bold">{t('navigation.error.tryAgainMessage')}</Text>
    </View>
  );
}
