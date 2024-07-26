import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';

import { Tab as TabType } from '../index';

type TabProps = {
  compactMode?: boolean;
  icon: string;
  isActive: boolean;
  name: TabType;
  onSelect: () => void;
};

type InnerTabsProps = {
  activeTab: TabType | undefined;
  compactMode?: boolean;
  onTabSelection: (tab: TabType) => void;
};

export function InnerTabs({ activeTab, compactMode, onTabSelection }: InnerTabsProps) {
  return (
    <View tw={cn('w-full', compactMode && 'flex flex-row justify-center space-x-2 flex-wrap')}>
      <Tab
        name="users"
        icon="account-multiple-outline"
        isActive={activeTab === 'users'}
        onSelect={() => onTabSelection('users')}
        compactMode={compactMode}
      />
      <Tab
        name="utilization"
        icon="fan"
        isActive={activeTab === 'utilization'}
        onSelect={() => onTabSelection('utilization')}
        compactMode={compactMode}
      />
      <Tab
        name="impact"
        icon="chart-line"
        isActive={activeTab === 'impact'}
        onSelect={() => onTabSelection('impact')}
        compactMode={compactMode}
      />
    </View>
  );
}

function Tab({ compactMode, name, icon, isActive, onSelect }: TabProps) {
  const { t } = useTranslationUtils();
  return (
    <TouchableOpacity
      tw={cn(
        'flex flex-row items-center justify-between space-x-2 my-1 px-3 py-1.5 border border-gray-400 rounded-md',
        isActive && compactMode && 'bg-green-primary border-green-primary',
        compactMode && 'mx-2'
      )}
      onPress={onSelect}
    >
      <View tw={cn('p-1 bg-gray-300 rounded-3xl', isActive && compactMode && 'bg-green-primary')}>
        <Icon source={icon} size={18} color={isActive && compactMode ? 'white' : 'black'} />
      </View>
      <Text
        variant="TextMedium"
        tw={cn('text-base text-gray-500', isActive && compactMode && 'text-white')}
      >
        {t(`Dashboard.Analytics.companyTab.${name}`)}
      </Text>

      {!compactMode && <Icon source="arrow-right" size={15} />}
    </TouchableOpacity>
  );
}
