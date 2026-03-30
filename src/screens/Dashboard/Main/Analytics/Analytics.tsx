import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { useTranslationUtils } from '#i18n/utils';

import { AggregatedSection } from './Aggregated';
import { CompanySection } from './Company';
import { ComparisonSection } from './Comparison';

type Tab = 'company' | 'aggregated' | 'comparison';
type TabProps = {
  name: Tab;
  isActive: boolean;
  onSelect: () => void;
};

const TABS = {
  aggregated: <AggregatedSection key="aggregated-section" />,
  company: <CompanySection key="company-section" />,
  comparison: <ComparisonSection key="comparison-section" />,
};

export function Analytics() {
  const [activeTab, setActiveTab] = useState<Tab>('company');

  return (
    <View tw="flex-1">
      <View tw="bg-gray-100/80 p-1.5 rounded-xl flex-row items-center mx-4 mt-2">
        <Tab
          name="company"
          isActive={activeTab === 'company'}
          onSelect={() => setActiveTab('company')}
        />
        <Tab
          name="aggregated"
          isActive={activeTab === 'aggregated'}
          onSelect={() => setActiveTab('aggregated')}
        />
        <Tab
          name="comparison"
          isActive={activeTab === 'comparison'}
          onSelect={() => setActiveTab('comparison')}
        />
      </View>
      <View tw="flex-1 px-4">{TABS[activeTab]}</View>
    </View>
  );
}

function Tab({ name, isActive, onSelect }: TabProps) {
  const { t } = useTranslationUtils();
  return (
    <TouchableOpacity
      tw={cn(
        'flex-1 py-2.5 items-center justify-center rounded-lg transition-all',
        isActive ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Text
        variant="TitleSmall"
        tw={cn('text-sm', isActive ? 'text-green-primary font-bold' : 'text-gray-500')}
      >
        {t(`Dashboard.Analytics.${name}`)}
      </Text>
    </TouchableOpacity>
  );
}
