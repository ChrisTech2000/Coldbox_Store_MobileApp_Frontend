import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

import { GeneralContent } from './components/GeneralContent';
import { InnerTabs } from './components/InnerTabs';
import { UsersContent } from './components/UsersContent';
import { UtilizationContent } from './components/UtilizationContent';
import { ImpactContent } from './components/ImpactContent';

export type Tab = 'users' | 'utilization' | 'impact';

const TABS = {
  users: <UsersContent key="users-content-section" />,
  utilization: <UtilizationContent key="utilization-content-section" />,
  impact: <ImpactContent key="impact-content-section" />,
};

export function CompanySection() {
  const { t } = useTranslationUtils();

  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

  return (
    <ScrollView tw="mt-8" showsVerticalScrollIndicator={false}>
      {activeTab && (
        <TouchableOpacity
          tw="flex flex-row w-full items-center space-x-2 justify-start"
          onPress={() => setActiveTab(undefined)}
        >
          <Icon source="arrow-left-circle-outline" size={15} />
          <Text variant="TextMedium" tw="text-base">
            {t(`Dashboard.Analytics.companyTab.goBackButton`)}
          </Text>
        </TouchableOpacity>
      )}
      <View tw="items-center mt-2 space-y-2">
        <InnerTabs
          activeTab={activeTab}
          onTabSelection={(tab: Tab) => setActiveTab(tab)}
          compactMode
        />
        {!activeTab ? (
          <View tw="w-full">
            <GeneralContent />
            <InnerTabs activeTab={activeTab} onTabSelection={(tab: Tab) => setActiveTab(tab)} />
            <Button
              mode="contained"
              onPress={() => null}
              tw="mt-2"
              contentStyle="bg-gray-300"
              labelStyle="text-black text-base"
            >
              {t('Dashboard.Analytics.companyTab.methodologyButton')}
            </Button>
          </View>
        ) : (
          [TABS[activeTab]]
        )}
      </View>
    </ScrollView>
  );
}
