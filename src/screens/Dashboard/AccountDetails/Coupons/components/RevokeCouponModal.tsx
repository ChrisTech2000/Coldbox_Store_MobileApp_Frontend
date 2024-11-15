import React, { type SetStateAction } from 'react';
import { Dialog, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useControlledState } from '#ui/hooks/useControlledState';
import { paperTheme } from '#ui/lib/theme';

export default function RevokeCouponModal(props: {
  visible: boolean;
  onChangeVisible: (v: SetStateAction<boolean>) => void;
  onConfirm?: () => void;
}) {
  const { t } = useTranslationUtils();

  const [visible, onChangeVisible] = useControlledState(props.visible, props.onChangeVisible);

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
          >
            {t('actions.cancel')}
          </Button>
          <Button
            textColor={paperTheme.colors.error}
            onPress={(evt) => {
              evt.stopPropagation();
              props.onConfirm?.();
              onChangeVisible(false);
            }}
          >
            {t('actions.confirm')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
