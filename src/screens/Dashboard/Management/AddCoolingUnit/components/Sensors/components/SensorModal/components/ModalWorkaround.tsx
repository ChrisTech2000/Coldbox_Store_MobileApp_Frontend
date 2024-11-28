import React from 'react';
import { View } from 'react-native';
import { Portal, Dialog } from 'react-native-paper';
import { styled } from 'nativewind';

import { RNModal } from '#ui/primitives/RNModal';

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  useDefaultStyle?: boolean;
  children: React.ReactNode;
}

const _Dialog = styled(Dialog);

export function ModalWorkaround(props: ModalProps) {
  const { visible, onDismiss, useDefaultStyle = true, children } = props;

  if (useDefaultStyle) {
    return (
      <Portal>
        <RNModal visible={visible} onDismiss={onDismiss}>
          <View tw="w-full bg-white rounded-3xl w-5/6 max-w-5/6 h-auto pt-6 pb-4 self-center space-y-2">
            {children}
          </View>
        </RNModal>
      </Portal>
    );
  }

  return (
    <Portal>
      <_Dialog
        visible={visible}
        onDismiss={onDismiss}
        tw="w-full bg-white rounded-3xl w-5/6 max-w-5/6 h-auto px-0 pt-0 pb-4 self-center space-y-2"
      >
        {children}
      </_Dialog>
    </Portal>
  );
}
