import React, { type PropsWithChildren } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { Text } from '#ui/components/Text';

import { cn } from '#ui/lib/cn';
import type { AuthRoutes } from '../index';

type Paths = Exclude<keyof AuthRoutes, 'Root'>;

const HEADER_TITLES: Record<Paths, string> = {
  SignIn: 'Log in',
  SignUpCompany: 'Sign up',
  SignUpCoolingUser: 'Sign up',
  PasswordRecovery: 'Forgot Password',
  AppInfo: 'FAQ',
};

function HeaderItem(props: PropsWithChildren<{ adjustToContent?: boolean }>) {
  const { adjustToContent } = props;

  return (
    <View tw={cn('w-20 max-w-20 items-center', adjustToContent && 'w-auto max-w-auto')}>
      {props.children}
    </View>
  );
}

export default function NavigatorHeader(props: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      tw="p-3.5 w-full flex-row items-center justify-between bg-white border-b border-zinc-200"
    >
      <HeaderItem>
        <TouchableOpacity
          onPress={(evt) => {
            evt.stopPropagation();
            props.navigation.goBack();
          }}
        >
          <Text>Go back</Text>
        </TouchableOpacity>
      </HeaderItem>

      <HeaderItem adjustToContent>
        <Text>{HEADER_TITLES[props.route.name as Paths]}</Text>
      </HeaderItem>

      <HeaderItem />
    </View>
  );
}
