import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

import { SkiaShadow } from '#ui/primitives/SkiaShadow';

type AccountCardProps = {
  isActive: boolean;
  onPress: () => void;
} & React.PropsWithChildren;

export function AccountCard({ children, isActive, onPress }: AccountCardProps) {
  return isActive ? (
    <TouchableOpacity
      tw="border-green-primary rounded-md border bg-white border-4"
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <SkiaShadow
      blur={4}
      dx={0}
      dy={0}
      color={isActive ? colors.transparent : colors.zinc[200]}
      borderRadius={0}
    >
      <TouchableOpacity
        tw="border-green-primary rounded-md border bg-white"
        style={{ padding: 3 }}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </SkiaShadow>
  );
}
