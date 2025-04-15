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
        'flex flex-row items-center justify-between space-x-2 my-1 px-3 py-1.5 border border-gray-400 rounded-md',
        isActive && compactMode && 'bg-green-primary border-green-primary',
        compactMode && 'mx-2',
        disabled && ''
      )}
      onPress={onSelect}
      disabled={disabled}
    >
      <View
        tw={cn(
          'p-1 bg-gray-300 rounded-3xl',
          isActive && compactMode && 'bg-green-primary',
          disabled && 'bg-gray-200'
        )}
      >
        <Icon
          source={icon}
          size={18}
          color={disabled ? colors.gray[300] : isActive && compactMode ? 'white' : 'black'}
        />
      </View>
      <Text
        variant="TextMedium"
        tw={cn(
          'text-base text-gray-500',
          isActive && compactMode && 'text-white',
          disabled && 'text-gray-300'
        )}
      >
        {name}
      </Text>

      {!compactMode ? <_NavigationArrow color={disabled ? colors.gray[300] : 'black'} /> : null}
    </TouchableOpacity>
  );
}

function _NavigationArrow(props: { color: string }) {
  const isRTL = LanguageManager.isRTL;
  return <Icon source={isRTL ? 'arrow-left' : 'arrow-right'} size={15} color={props.color} />;
}
