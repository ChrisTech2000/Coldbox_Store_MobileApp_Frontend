import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';

type CommonFooterProps = {
  tabs: React.ReactNode;
};
export function CommonFooter({ tabs }: CommonFooterProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="w-full mt-2">
      {tabs}
      <Button
        mode="contained"
        onPress={() => null}
        tw="mt-2"
        contentStyle="bg-gray-300"
        labelStyle="text-black text-base"
      >
        {t('Dashboard.Analytics.methodologyButton')}
      </Button>
    </View>
  );
}
