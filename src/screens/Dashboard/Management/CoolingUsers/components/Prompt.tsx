import React, { useRef } from 'react';
import { View } from 'react-native';
import type { NavigationProp } from '@react-navigation/native';
import { Divider, List, Modal, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import type { ManagementRoutePaths, ManagementRoutes } from '#navigation/Dashboard/Management';
import { useToggle } from '#ui/hooks/useToggle';
import { useTranslationUtils } from '#i18n/utils';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import { useUnmount } from '#ui/hooks/useUnmount';

type Props = {
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>;
};

export default function Prompt(props: Props) {
  const { navigation } = props;

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t } = useTranslationUtils();

  useAppEventListener<[boolean]>('DISPATCH_CU_PROMPT', setModalVisibility);

  useUnmount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={toggleVisibility}>
        <View tw="w-full bg-white rounded-3xl w-2/3 max-w-2/3 h-auto pt-6 pb-4 self-center space-y-2">
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.CoolingUsers.modals.selectMethod')}
          </Text>
          <View tw="w-full py-1.5">
            <List.Item
              title={t('Dashboard.Management.CoolingUsers.modals.addWithDetails')}
              tw="px-2"
              titleNumberOfLines={2}
              onPress={() => {
                toggleVisibility();
                navigation.navigate('AddCoolingUser');
              }}
            />
            <Divider />

            <List.Item
              title={t('Dashboard.Management.CoolingUsers.modals.addByCode')}
              tw="px-2"
              titleNumberOfLines={2}
              onPress={() => {
                toggleVisibility();
                timeoutRef.current = setTimeout(
                  () => emitter.emit(APP_EVENTS.DISPATCH_CU_FORM_MODAL, true),
                  440
                );
              }}
            />
            <Divider />
          </View>
          <View tw="self-end px-6">
            <Button mode="text" onPress={toggleVisibility}>
              {t('actions.close')}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
