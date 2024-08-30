import React from 'react';
import { View } from 'react-native';

import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';

import { Tab } from '../../components/InnerTab';

export type Tab = 'crates' | 'impact';

type InnerTabsProps = {
  activeTab: Tab | undefined;
  compactMode?: boolean;
  disabled?: boolean;
  onTabSelection: (tab: Tab) => void;
};

export function InnerTabs({ activeTab, compactMode, disabled, onTabSelection }: InnerTabsProps) {
  const { t } = useTranslationUtils();
  return (
    <View tw={cn('w-full', compactMode && 'flex flex-row justify-center space-x-2 flex-wrap')}>
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
