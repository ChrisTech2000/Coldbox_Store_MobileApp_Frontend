import React, { useEffect, useState } from 'react';
import { Keyboard, View, type ViewProps } from 'react-native';

export default function HideWithKeyboardView({ children, ...props }: ViewProps) {
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
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

  return <View {...props}>{children}</View>;
}
