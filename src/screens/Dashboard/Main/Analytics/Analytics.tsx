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
    <View tw="space-y-4 m-4">
      <View tw="flex flex-row items-center justify-center">
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
      {[TABS[activeTab]]}
    </View>
  );
}

function Tab({ name, isActive, onSelect }: TabProps) {
  const { t } = useTranslationUtils();
  return (
    <TouchableOpacity
      tw={cn('bg-gray-200 rounded-md mx-2 py-1 px-3', isActive && 'bg-gray-800')}
      onPress={onSelect}
    >
      <Text variant="TitleMedium" tw={cn('text-base', isActive && 'text-white')}>
        {t(`Dashboard.Analytics.${name}`)}
      </Text>
    </TouchableOpacity>
  );
}
