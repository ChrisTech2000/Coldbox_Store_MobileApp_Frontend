import React from 'react';
import { Keyboard, View, type ViewProps } from 'react-native';

type Props = ViewProps & {
  isE2e?: boolean;
};

export default function HideWithKeyboardView(
  props: React.PropsWithChildren<Props>
): JSX.Element | null {
  const { children, isE2e, ...rest } = props;

  const [keyboardVisible, setKeyboardVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const showEvtListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideEvtListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showEvtListener.remove();
      hideEvtListener.remove();
    };
  }, []);

  if (keyboardVisible) return null;
  if (isE2e) return <React.Fragment>{children}</React.Fragment>;

  return <View {...rest}>{children}</View>;
}
