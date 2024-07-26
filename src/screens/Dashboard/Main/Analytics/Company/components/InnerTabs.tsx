import React from 'react';
import { View } from 'react-native';

import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';

import { Tab as TabType } from '../index';
import { Tab } from '../../components/InnerTab';

type InnerTabsProps = {
  activeTab: TabType | undefined;
  compactMode?: boolean;
  onTabSelection: (tab: TabType) => void;
};

export function InnerTabs({ activeTab, compactMode, onTabSelection }: InnerTabsProps) {
  const { t } = useTranslationUtils();
  return (
    <View tw={cn('w-full', compactMode && 'flex flex-row justify-center space-x-2 flex-wrap')}>
      <Tab
        name={t(`Dashboard.Analytics.users`)}
        icon="account-multiple-outline"
        isActive={activeTab === 'users'}
        onSelect={() => onTabSelection('users')}
        compactMode={compactMode}
      />
      <Tab
        name={t(`Dashboard.Analytics.companyTab.utilization`)}
        icon="fan"
        isActive={activeTab === 'utilization'}
        onSelect={() => onTabSelection('utilization')}
        compactMode={compactMode}
      />
      <Tab
        name={t(`Dashboard.Analytics.impact`)}
        icon="chart-line"
        isActive={activeTab === 'impact'}
        onSelect={() => onTabSelection('impact')}
        compactMode={compactMode}
      />
    </View>
  );
}
