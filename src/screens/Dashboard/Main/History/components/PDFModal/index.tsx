import React from 'react';
import { Dialog } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import type { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, EInitiatedFor } from '#types/global';

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
  const { t } = useTranslationUtils();

  const isCheckIn = movement.initiatedFor === EInitiatedFor.CHECK_IN;

  return (
    <Dialog visible={isOpen} onDismiss={dismiss} style={{ backgroundColor: 'white' }}>
      <Dialog.Title>
        {isCheckIn
          ? t('Dashboard.History.pdfModal.checkIn.title')
          : t('Dashboard.History.pdfModal.checkOut.title')}
      </Dialog.Title>
      <Dialog.Content>
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
      </Dialog.Content>
    </Dialog>
  );
}
