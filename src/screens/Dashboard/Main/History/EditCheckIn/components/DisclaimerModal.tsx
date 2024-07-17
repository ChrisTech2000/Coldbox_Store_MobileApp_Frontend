import React from 'react';
import { View } from 'react-native';
import { Divider, Portal } from 'react-native-paper';

import { Modal } from '#ui/components/Modal';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

type DetailsModalProps = {
  isOpen: boolean;
  dismiss: () => void;
};

export function DisclaimerModal({ isOpen, dismiss }: DetailsModalProps) {
  const { t } = useTranslationUtils();

  return (
    <Portal>
      <Modal visible={isOpen} onDismiss={dismiss}>
        <View tw="w-[70%] bg-white mx-14 p-2 rounded-sm h-auto space-y-4">
          <Text variant="TextMedium" tw="text-base mt-2 px-4">
            {t('Dashboard.History.editCheckIn.disclaimerMessage')}
          </Text>
          <Divider />
          <Button mode="text" uppercase labelStyle="text-lg" onPress={dismiss}>
            {t('actions.ok')}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
