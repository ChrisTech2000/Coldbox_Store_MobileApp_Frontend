import React from 'react';
import { LayoutAnimation, Platform, TouchableWithoutFeedback, UIManager, View } from 'react-native';
import { Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { ScrollView } from '#ui/components/ScrollView';

type SectionAccordionProps = {
  expanded: boolean;
  title: string;
  color: string;
  content: React.ReactNode;
  setExpanded: () => void;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function SectionAccordion({
  expanded,
  setExpanded,
  title,
  content,
  color,
}: SectionAccordionProps) {
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded();
  };

  return (
    <View tw="space-y-2 my-2 w-full">
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View
          tw={cn(
            'flex flex-row items-center justify-between h-16 px-3 py-1 items-center justify-between rounded-lg w-full',
            color
          )}
        >
          <Text variant="TitleMedium" tw="text-base font-bold">
            {title}
          </Text>
          <Icon
            source={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.gray[500]}
          />
        </View>
      </TouchableWithoutFeedback>
      {expanded ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle="w-full"
        >
          {content}
        </ScrollView>
      ) : null}
    </View>
  );
}
