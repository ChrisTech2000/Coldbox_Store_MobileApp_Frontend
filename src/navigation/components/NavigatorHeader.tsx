import moize from 'moize';
import React from 'react';
import { Appbar } from 'react-native-paper';

export type NavigationHeaderProps = {
  routeTitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export default moize.react({
  maxSize: 1,
  isDeepEqual: true,
})((props: NavigationHeaderProps) => {
  return (
    <Appbar.Header>
      {props.leftContent}
      <Appbar.Content title={props.routeTitle} />
      {props.rightContent}
    </Appbar.Header>
  );
});
