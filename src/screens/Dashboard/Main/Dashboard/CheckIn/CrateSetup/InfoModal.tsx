import React from 'react';
import { Button, Portal } from 'react-native-paper';
import { View } from 'react-native';

import { useTranslationUtils } from '#i18n/utils';

import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';

type InfoModalProps = {
  visible: boolean;
  onDismiss: () => void;
};

export function InfoModal({ visible, onDismiss }: InfoModalProps) {
  const { t } = useTranslationUtils();

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto pt-6 pb-4 px-5 self-center space-y-2">
          <Text tw="text-base mb-4">
            {t('Dashboard.CrateManagement.CheckIn.Setup.crateWeightAndPricing.info')}
          </Text>
          <Button onPress={onDismiss}>{t('actions.close')}</Button>
        </View>
      </Modal>
    </Portal>
  );
}
