import React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';

import { Text } from '#ui/components/Text';

type InfoModalProps = {
  visible: boolean;
  onDismiss: () => void;
};

export function InfoModal({ visible, onDismiss }: InfoModalProps) {
  const { t } = useTranslationUtils();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor: 'white' }}>
        <Dialog.Content>
          <Text tw="text-base">
            {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.info')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{t('actions.close')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
