import React from 'react';
import { Appbar } from 'react-native-paper';

export type NavigationHeaderProps = {
  routeTitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

function NavigationHeader({ leftContent, rightContent, routeTitle }: NavigationHeaderProps) {
  return (
    <Appbar.Header>
      {leftContent}
      <Appbar.Content title={routeTitle} />
      {rightContent}
    </Appbar.Header>
  );
}

// Compare only what matters. React elements should be compared by identity (===).
const arePropsEqual = (
  prev: Readonly<NavigationHeaderProps>,
  next: Readonly<NavigationHeaderProps>
) =>
  prev.routeTitle === next.routeTitle &&
  prev.leftContent === next.leftContent &&
  next.rightContent === prev.rightContent;

export default React.memo(NavigationHeader, arePropsEqual);
