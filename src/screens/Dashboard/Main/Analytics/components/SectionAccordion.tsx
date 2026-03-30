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
    <View tw="my-2 w-full">
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View
          tw={cn(
            'flex flex-row items-center justify-between h-14 px-4 rounded-xl w-full bg-white border border-gray-100 shadow-sm',
            expanded && 'rounded-b-none'
          )}
        >
          <Text variant="TitleSmall" tw="text-gray-800 font-bold">
            {title}
          </Text>
          <View tw="p-1 bg-gray-50 rounded-full">
            <Icon
              source={expanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.gray[500]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {expanded ? (
        <View tw="bg-white border-x border-b border-gray-100 shadow-sm rounded-b-xl overflow-hidden">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle="w-full"
          >
            {content}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
