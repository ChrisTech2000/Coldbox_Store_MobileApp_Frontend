import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

type SectionProps = {
  title: string;
  userType1: string;
  userType2: string;
  otherType?: number;
};

export function UserSection({ title, userType1, userType2 }: SectionProps) {
  const { t } = useTranslationUtils();

  // Extract counts from strings like "👨🏽 Male: 12" or "👩🏽 Female: 5"
  const count1 = userType1.match(/\d+/)?.[0] || '0';
  const count2 = userType2.match(/\d+/)?.[0] || '0';

  return (
    <View tw="w-full bg-white border border-gray-100 shadow-sm rounded-3xl p-6 my-2">
      <View tw="flex-row items-center justify-between mb-6 border-b border-gray-50 pb-4">
        <View tw="flex-1 flex-row items-center space-x-2 mr-2">
          <View tw="p-1.5 bg-green-50 rounded-lg shrink-0">
            <Icon source="sprout" size={16} color={colors.green[700]} />
          </View>
          <Text variant="TitleSmall" tw="text-gray-900 font-black underline decoration-amber-500/30 flex-1">
            {title.split('=')[0].trim()}
          </Text>
        </View>
        <View tw="bg-amber-500 px-3 py-1.5 rounded-2xl shadow-sm shadow-amber-200 shrink-0">
          <Text tw="text-white text-[10px] font-black uppercase">
            Total: {title.includes('=') ? title.split('=')[1].trim() : '0'}
          </Text>
        </View>
      </View>

      <View tw="flex-row items-center justify-between space-x-4">
        <View tw="flex-1 bg-amber-50/40 rounded-[32px] p-5 border border-amber-100/50 items-center">
          <View tw="w-12 h-12 bg-amber-100/80 rounded-2xl items-center justify-center mb-3">
            <Icon source="account-cowboy-hat" size={24} color={colors.amber[800]} />
          </View>
          <Text variant="TextSmall" tw="text-amber-900/60 font-black uppercase text-[10px] tracking-widest mb-1">Men</Text>
          <Text variant="HeadlineSmall" tw="text-gray-900 font-black">
            {count1}
          </Text>
        </View>

        <View tw="flex-1 bg-emerald-50/40 rounded-[32px] p-5 border border-emerald-100/50 items-center">
          <View tw="w-12 h-12 bg-emerald-100/80 rounded-2xl items-center justify-center mb-3">
            <Icon source="face-woman-outline" size={24} color={colors.emerald[800]} />
          </View>
          <Text variant="TextSmall" tw="text-emerald-900/60 font-black uppercase text-[10px] tracking-widest mb-1">Women</Text>
          <Text variant="HeadlineSmall" tw="text-gray-900 font-black">
            {count2}
          </Text>
        </View>
      </View>
    </View>
  );
}
