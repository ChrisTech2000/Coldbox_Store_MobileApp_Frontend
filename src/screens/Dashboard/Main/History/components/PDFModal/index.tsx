import React, { useMemo } from 'react';

import { Modal } from '#ui/components/Modal';

import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EMovementType } from '#types/global';

import { CheckOutData } from './CheckOutData';
import { CheckInData } from './CheckInData';

type PDFModalProps = {
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

export function PDFModal({ isOpen, movement, dismiss }: PDFModalProps) {
  const isCheckIn = useMemo(() => {
    return movement.movementType === EMovementType.IN;
  }, [movement]);

  return (
    <Modal visible={isOpen} onDismiss={dismiss}>
      {isCheckIn ? <CheckInData /> : <CheckOutData movement={movement} dismissModal={dismiss} />}
    </Modal>
  );
}
