import React from 'react';
import { View } from 'react-native';

import { useTranslationUtils } from '#i18n/utils';

import { Text } from './Text';

export function GenericEmptyState({ message }: { message?: string }) {
  const { t } = useTranslationUtils();

  return (
    <View tw="flex-1 items-center text-center mx-4 mt-4">
      <Text variant="TextBold" tw="text-base text-green-primary text-center">
        {message ?? t('Dashboard.emptyGeneral')}
      </Text>
    </View>
  );
}
