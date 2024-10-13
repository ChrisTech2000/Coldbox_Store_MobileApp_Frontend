import React from 'react';
import { Appbar } from 'react-native-paper';

export type NavigationHeaderProps = {
  routeTitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export default function NavigatorHeader(props: NavigationHeaderProps) {
  return (
    <Appbar.Header>
      {props.leftContent}
      <Appbar.Content title={props.routeTitle} />
      {props.rightContent}
    </Appbar.Header>
  );
}
