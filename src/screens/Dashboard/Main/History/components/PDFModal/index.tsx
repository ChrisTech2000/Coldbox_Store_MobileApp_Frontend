import React, { useMemo } from 'react';

import { Modal } from '#ui/components/Modal';

import { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, EMovementType } from '#types/global';

import { CheckOutData } from './CheckOutData';
import { CheckInData } from './CheckInData';

type PDFModalProps = {
  companyName: string;
  coolingUnit: CoolingUnit | null;
  currency: string;
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

export function PDFModal({
  isOpen,
  companyName,
  coolingUnit,
  currency,
  movement,
  dismiss,
}: PDFModalProps) {
  const isCheckIn = useMemo(() => {
    return movement.movementType === EMovementType.IN;
  }, [movement]);

  return (
    <Modal visible={isOpen} onDismiss={dismiss}>
      {isCheckIn ? (
        <CheckInData
          companyName={companyName}
          coolingUnit={coolingUnit}
          currency={currency}
          movement={movement}
          dismissModal={dismiss}
        />
      ) : (
        <CheckOutData movement={movement} dismissModal={dismiss} />
      )}
    </Modal>
  );
}
