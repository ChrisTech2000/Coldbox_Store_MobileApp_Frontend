import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { AnalyticsStackRoutes } from '#navigation/Dashboard/Main/AnalyticsStack';

type CommonFooterProps = {
  tabs: React.ReactNode;
};

export function CommonFooter({ tabs }: CommonFooterProps) {
  const { t } = useTranslationUtils();
  const navigation = useNavigation<NativeStackNavigationProp<AnalyticsStackRoutes>>();

  return (
    <View tw="w-full my-2">
      {tabs}
      <Button
        mode="contained"
        tw="mt-2 mb-16"
        contentStyle="bg-gray-300"
        labelStyle="text-black text-base"
        onPress={() => navigation.navigate('Methodology')}
      >
        {t('Dashboard.Analytics.methodologyButton')}
      </Button>
    </View>
  );
}
