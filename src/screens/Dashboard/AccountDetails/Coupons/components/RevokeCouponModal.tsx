import React, { type SetStateAction } from 'react';
import { Dialog, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { useControlledState } from '#ui/hooks/useControlledState';
import { paperTheme } from '#ui/lib/theme';
import reportCrash from '#ui/lib/reportCrash';

export default function RevokeCouponModal(props: {
  visible: boolean;
  onChangeVisible: (v: SetStateAction<boolean>) => void;
  onConfirm?: () => Promise<void>;
}) {
  const toast = InAppNotifications.useToast();
  const { t } = useTranslationUtils();

  const [visible, onChangeVisible] = useControlledState(props.visible, props.onChangeVisible);
  const [isRevoking, setIsRevoking] = React.useState<boolean>(false);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => onChangeVisible(false)}
        style={{ backgroundColor: 'white' }}
      >
        <Dialog.Title>{t('Dashboard.Management.Coupons.revokeTitle')}</Dialog.Title>
        <Dialog.Content>
          <Text>{t('Dashboard.Management.Coupons.revokeMessage')}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={(evt) => {
              evt.stopPropagation();
              onChangeVisible(false);
            }}
            disabled={isRevoking}
          >
            {t('actions.cancel')}
          </Button>
          <Button
            textColor={paperTheme.colors.error}
            onPress={async (evt) => {
              evt.stopPropagation();
              try {
                setIsRevoking(true);
                await props.onConfirm?.();
                onChangeVisible(false);
              } catch (exception) {
                toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
                reportCrash(exception as Error);
              } finally {
                setIsRevoking(false);
              }
            }}
            disabled={isRevoking}
          >
            {t('actions.confirm')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
