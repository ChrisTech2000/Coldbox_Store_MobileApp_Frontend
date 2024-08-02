import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnalyticsStackRoutes } from 'navigation/Dashboard/Main/AnalyticsStack';

type CommonFooterProps = {
  tabs: React.ReactNode;
};
export function CommonFooter({ tabs }: CommonFooterProps) {
  const { t } = useTranslationUtils();
  const navigation = useNavigation<NativeStackNavigationProp<AnalyticsStackRoutes>>();

  return (
    <View tw="w-full mt-2 mb-4">
      {tabs}
      <Button
        mode="contained"
        onPress={() => null}
        tw="mt-2"
        contentStyle="bg-gray-300"
        labelStyle="text-black text-base"
        onPressIn={() => navigation.navigate('Methodology')}
      >
        {t('Dashboard.Analytics.methodologyButton')}
      </Button>
    </View>
  );
}
