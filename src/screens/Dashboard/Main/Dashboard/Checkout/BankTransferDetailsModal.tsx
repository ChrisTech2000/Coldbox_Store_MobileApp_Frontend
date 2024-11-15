import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Dialog, Divider, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';

type BankTransferModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export function BankTransferModal(props: BankTransferModalProps) {
  const { isOpen, closeModal } = props;
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);

  const { data, isLoading } = useApiCall(
    'getLocations',
    ColdtivateService.getLocations,
    company?.id as number,
    {
      skip: !company?.id,
      defaultData: [],
    }
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={closeModal} style={{ backgroundColor: 'white' }}>
        <Dialog.Title>{t('Dashboard.CrateManagement.CheckOut.bankTransfer.title')}</Dialog.Title>
        <Dialog.Content>
          <View tw="flex flex-row justify-between">
            <Text tw="text-base">
              {t('Dashboard.CrateManagement.CheckOut.bankTransfer.accountName')}
            </Text>
            <Text tw="text-base">{data?.[0]?.company.bankDetails?.accountName ?? ''}</Text>
          </View>
          <Divider tw="bg-gray-400 my-2" />

          <View tw="flex flex-row justify-between">
            <Text tw="text-base">
              {t('Dashboard.CrateManagement.CheckOut.bankTransfer.accountNumber')}
            </Text>
            <Text tw="text-base">{data?.[0]?.company.bankDetails?.accountNumber ?? ''}</Text>
          </View>
          <Divider tw="bg-gray-400 my-2" />

          <View tw="flex flex-row justify-between">
            <Text tw="text-base">
              {t('Dashboard.CrateManagement.CheckOut.bankTransfer.bankName')}
            </Text>
            <Text tw="text-base">{data?.[0]?.company.bankDetails?.bankName ?? ''}</Text>
          </View>
          <Divider tw="bg-gray-400 my-2" />
        </Dialog.Content>
        <Dialog.Actions>
          <Button uppercase onPress={closeModal}>
            {t('actions.close')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
