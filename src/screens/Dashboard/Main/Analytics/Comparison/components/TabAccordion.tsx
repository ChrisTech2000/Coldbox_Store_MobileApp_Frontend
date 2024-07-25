import React from 'react';
import { LayoutAnimation, Platform, TouchableWithoutFeedback, UIManager, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import colors from 'tailwindcss/colors';

type TabAccordionProps = {
  expanded: boolean;
  title: string;
  content: React.ReactNode;
  setExpanded: () => void;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function TabAccordion({ expanded, setExpanded, title, content }: TabAccordionProps) {
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded();
  };

  return (
    <View tw="space-y-2 my-2">
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View tw="flex flex-row items-center justify-between bg-green-transparency h-16 px-3 py-1 items-center justify-between rounded-lg">
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
      {expanded && content}
    </View>
  );
}
