import React from 'react';
import { View } from 'react-native';

import { useTranslationUtils } from '#i18n/utils';

import { Text } from '#ui/components/Text';
import { Divider } from 'react-native-paper';

type SectionProps = {
  title: string;
  userType1: string;
  userType2: string;
  otherType?: number;
};

export function UserSection({ title, userType1, userType2, otherType }: SectionProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="w-full bg-green-transparency px-2 py-1 items-center rounded-lg space-y-2 my-2">
      <Text variant="TextMedium" tw="text-base text-center">
        {title}
      </Text>
      <View tw="flex flex-row space-x-2 items-center">
        <Text variant="TextMedium" tw="text-base">
          {userType1}
        </Text>
        <Divider tw="bg-green-primary w-0.5 h-8" />
        <Text variant="TextMedium" tw="text-base">
          {userType2}
        </Text>
      </View>
      {otherType !== undefined && (
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.otherLabel', { amount: otherType })}
        </Text>
      )}
    </View>
  );
}
