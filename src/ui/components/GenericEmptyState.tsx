import React from 'react';
import { View } from 'react-native';

import { Text } from './Text';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

export function GenericEmptyState({ message }: { message?: string }) {
  const { t } = useTranslationUtils();
  const isRTL = LanguageManager.isRTL;
  return (
    <View tw={cn('flex-1 items-center mx-4 mt-4', isRTL && 'items-start')}>
      <Text
        variant="TextBold"
        tw={cn('text-base text-green-primary text-center', isRTL && 'text-left')}
      >
        {message ?? t('Dashboard.emptyGeneral')}
      </Text>
    </View>
  );
}
