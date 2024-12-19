import React from 'react';
import { Dialog, Portal, Text } from 'react-native-paper';

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
        <Dialog.Content>
          <Text tw="text-base">{t('Dashboard.History.editCheckIn.disclaimerMessage')}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button uppercase labelStyle="text-base" onPress={dismiss}>
            {t('actions.ok')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
