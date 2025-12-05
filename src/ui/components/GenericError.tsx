import React from 'react';
import { View } from 'react-native';
import { Icon, IconButton } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { Text } from './Text';

type GenericErrorProps = {
  retry?: () => void;
};

// TODO: have design take a look at this
export function GenericError({ retry }: GenericErrorProps) {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();

  return (
    <View tw="flex-1 items-center mt-[50%] w-full space-y-2">
      <Icon source="information" size={50} color={colors.red[800]} />
      <Text tw="text-red-800 font-bold text-base">{t('navigation.error.errorMessage')}</Text>
      <Text tw="text-red-800 text-base font-bold">{t('navigation.error.tryAgainMessage')}</Text>
      {retry ? (
        <View tw="pt-8">
          <IconButton
            icon="refresh"
            size={50}
            onPress={retry}
            accessibilityLabel={t('navigation.error.errorMessage')}
          />
        </View>
      ) : null}
    </View>
  );
}
