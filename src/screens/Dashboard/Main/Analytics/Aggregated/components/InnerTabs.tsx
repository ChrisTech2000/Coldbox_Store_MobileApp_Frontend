import React from 'react';
import { View } from 'react-native';

import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';

import { Tab } from '../../components/InnerTab';

export type Tab = 'users' | 'crates' | 'impact';

type InnerTabsProps = {
  activeTab: Tab | undefined;
  compactMode?: boolean;
  disabled?: boolean;
  onTabSelection: (tab: Tab) => void;
};

export function InnerTabs({ activeTab, compactMode, disabled, onTabSelection }: InnerTabsProps) {
  const { t } = useTranslationUtils();
  return (
    <View tw={cn('w-full bg-gray-100 p-1 rounded-xl flex-row', compactMode && 'space-x-1')}>
      <Tab
        name={t(`Dashboard.Analytics.users`)}
        icon="account-group"
        isActive={activeTab === 'users'}
        onSelect={() => onTabSelection('users')}
        compactMode={compactMode}
        disabled={disabled}
      />
      <Tab
        name={t(`Dashboard.Analytics.tabsShared.crates`)}
        icon="basket"
        isActive={activeTab === 'crates'}
        onSelect={() => onTabSelection('crates')}
        compactMode={compactMode}
        disabled={disabled}
      />
      <Tab
        name={t(`Dashboard.Analytics.impact`)}
        icon="chart-line"
        isActive={activeTab === 'impact'}
        onSelect={() => onTabSelection('impact')}
        compactMode={compactMode}
        disabled={disabled}
      />
    </View>
  );
}
