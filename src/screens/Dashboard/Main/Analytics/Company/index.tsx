import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';
import { GeneralContent } from './components/GeneralContent';

type Tab = 'users' | 'utilization' | 'impact';
type TabProps = {
  icon: string;
  isActive: boolean;
  name: Tab;
  onSelect: () => void;
};

export function CompanySection() {
  const { t } = useTranslationUtils();

  const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

  return (
    <ScrollView tw="mt-8">
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
        <View tw="flex flex-row justify-center space-x-2 flex-wrap">
          <Tab
            name="users"
            icon="account-multiple-outline"
            isActive={activeTab === 'users'}
            onSelect={() => setActiveTab('users')}
          />
          <Tab
            name="utilization"
            icon="fan"
            isActive={activeTab === 'utilization'}
            onSelect={() => setActiveTab('utilization')}
          />
          <Tab
            name="impact"
            icon="chart-line"
            isActive={activeTab === 'impact'}
            onSelect={() => setActiveTab('impact')}
          />
        </View>

        {!activeTab && <GeneralContent />}
      </View>
    </ScrollView>
  );
}

function Tab({ name, icon, isActive, onSelect }: TabProps) {
  const { t } = useTranslationUtils();
  return (
    <TouchableOpacity
      tw={cn(
        'flex flex-row items-center mx-2 my-1 space-x-2 px-3 py-1.5 border border-gray-400 rounded-md',
        isActive && 'bg-green-primary border-green-primary'
      )}
      onPress={onSelect}
    >
      <View tw={cn('p-1 bg-gray-300 rounded-3xl', isActive && 'bg-green-primary')}>
        <Icon source={icon} size={18} color={isActive ? 'white' : 'black'} />
      </View>
      <Text variant="TextMedium" tw={cn('text-base text-gray-500', isActive && 'text-white')}>
        {t(`Dashboard.Analytics.companyTab.${name}`)}
      </Text>
    </TouchableOpacity>
  );
}
