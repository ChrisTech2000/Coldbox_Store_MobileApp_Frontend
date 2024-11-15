import React from 'react';
import { Dialog, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';

type DisclaimerModalProps = {
  isOpen: boolean;
  dismiss: () => void;
};

export function DisclaimerModal({ isOpen, dismiss }: DisclaimerModalProps) {
  const { t } = useTranslationUtils();

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={dismiss} style={{ backgroundColor: 'white' }}>
        <Dialog.Title>{t('Dashboard.History.editCheckIn.disclaimerMessage')}</Dialog.Title>
        <Dialog.Actions>
          <Button uppercase labelStyle="text-lg" onPress={dismiss}>
            {t('actions.ok')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
