import React, { PropsWithChildren } from 'react';

import { ERoles } from '#types/global';

type Props = {
  protected: ERoles;
  value: ERoles;
};

export default function ConditionalField(props: PropsWithChildren<Props>) {
  if (props.protected !== props.value) return null;
  return <React.Fragment>{props.children}</React.Fragment>;
}
