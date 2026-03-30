import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';

import { cn } from '#ui/lib/cn';
import { LanguageManager } from '#i18n/utils';

type TabProps = {
  compactMode?: boolean;
  disabled?: boolean;
  icon: string;
  isActive: boolean;
  name: string;
  onSelect: () => void;
};

export function Tab({ compactMode, disabled, name, icon, isActive, onSelect }: TabProps) {
  return (
    <TouchableOpacity
      tw={cn(
        'flex flex-row items-center space-x-1.5 my-1.5 px-3 py-2.5 rounded-xl border',
        isActive ? 'bg-green-primary/10 border-green-primary' : 'bg-white border-gray-100 shadow-sm',
        compactMode && 'flex-1 mx-1',
        disabled && 'opacity-50'
      )}
      onPress={onSelect}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        tw={cn(
          'p-1 rounded-lg',
          isActive ? 'bg-green-primary' : 'bg-gray-100',
          disabled && 'bg-gray-200'
        )}
      >
        <Icon
          source={icon}
          size={16}
          color={disabled ? colors.gray[400] : isActive ? 'white' : colors.gray[600]}
        />
      </View>
      <Text
        variant="TitleSmall"
        tw={cn(
          'text-[12px] leading-tight',
          isActive ? 'text-green-primary font-bold' : 'text-gray-600',
          disabled && 'text-gray-300'
        )}
      >
        {name}
      </Text>

      {!compactMode ? (
        <View tw="flex-1 items-end">
          <_NavigationArrow color={isActive ? colors.green['600'] : colors.gray[400]} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

function _NavigationArrow(props: { color: string }) {
  const isRTL = LanguageManager.isRTL;
  return <Icon source={isRTL ? 'arrow-left' : 'arrow-right'} size={15} color={props.color} />;
}
