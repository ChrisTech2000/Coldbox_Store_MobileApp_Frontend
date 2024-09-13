import React, { type SetStateAction } from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useControlledState } from '#ui/hooks/useControlledState';
import { paperTheme } from '#ui/lib/theme';

// TODO → add text content to translations
export default function RevokeCouponModal(props: {
  visible: boolean;
  onChangeVisible: (v: SetStateAction<boolean>) => void;
  onConfirm?: () => void;
}) {
  const { t } = useTranslationUtils();

  const [visible, onChangeVisible] = useControlledState(props.visible, props.onChangeVisible);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => onChangeVisible(false)}>
        <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
          <View tw="items-start space-y-4 my-2.5">
            <Text variant="TitleMedium">Revoking Coupon</Text>
            <Text>
              Are you sure you want to revoke this coupon? Once revoked, it cannot be used again and
              the discount will no longer be available. This action is permanent and cannot be
              undone.
            </Text>
          </View>
          <View tw="flex-row self-end space-x-2">
            <Button
              mode="text"
              onPress={(evt) => {
                evt.stopPropagation();
                onChangeVisible(false);
              }}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              mode="text"
              textColor={paperTheme.colors.error}
              onPress={(evt) => {
                evt.stopPropagation();
                props.onConfirm?.();
                onChangeVisible(false);
              }}
            >
              {t('actions.confirm')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
