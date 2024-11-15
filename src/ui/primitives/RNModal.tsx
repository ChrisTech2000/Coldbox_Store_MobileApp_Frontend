import React, { type PropsWithChildren } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import { Modal as PaperModal } from 'react-native-paper';

function _KeyboardAwareModalIOS(
  props: PropsWithChildren<{ visible: boolean; onDismiss: () => void }>
) {
  const { visible, onDismiss, children } = props;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback
        onPress={(evt) => {
          evt.stopPropagation();
          Keyboard.dismiss();
          onDismiss();
        }}
      >
        <KeyboardAvoidingView
          tw="items-center justify-center flex-1 px-3 bg-zinc-900/40"
          behavior="padding"
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export const RNModal = Platform.OS === 'ios' ? _KeyboardAwareModalIOS : PaperModal;
