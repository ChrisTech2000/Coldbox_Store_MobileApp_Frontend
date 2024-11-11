import React, { type PropsWithChildren } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Modal, KeyboardAvoidingView, Platform, View } from 'react-native';

export default function RNModal(
  props: PropsWithChildren<{ visible: boolean; keyboardAware?: boolean; onDismiss: () => void }>
) {
  const { visible, keyboardAware, onDismiss, children } = props;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        {typeof keyboardAware !== 'undefined' ? (
          <KeyboardAvoidingView
            tw="items-center justify-center flex-1 px-3 bg-zinc-900/40"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {children}
          </KeyboardAvoidingView>
        ) : (
          <View tw="items-center justify-center flex-1 px-3 bg-zinc-900/40">{children}</View>
        )}
      </TouchableWithoutFeedback>
    </Modal>
  );
}
