import React from 'react';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

type NavigationHeaderProps = {
  titlesMap: Record<string, string>;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
} & NativeStackHeaderProps;

export default function NavigatorHeader(props: NavigationHeaderProps) {
  const routeTitle = props.titlesMap[props.route.name];

  return (
    <Appbar.Header>
      {props.leftContent}
      <Appbar.Content title={routeTitle} />
      {props.rightContent}
    </Appbar.Header>
  );
}
