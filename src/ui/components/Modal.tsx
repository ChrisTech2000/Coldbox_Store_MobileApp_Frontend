import React from 'react';
import { Modal, type ModalProps } from 'react-native-paper';
import { styled } from 'nativewind';

function _Wrapper({ children, ...rest }: ModalProps) {
  return <Modal {...rest}>{children}</Modal>;
}

const _StyledModal = styled(_Wrapper, {});

export { _StyledModal as Modal };
