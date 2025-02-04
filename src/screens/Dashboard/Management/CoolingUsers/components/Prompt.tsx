import { type NavigationProp } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider, List, Dialog, Portal } from 'react-native-paper';

import { CoolingUsersModalOverlay } from '#screens/Dashboard/Tutorial/CoolingUserModalOverlay';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { Button } from '#ui/components/Button';
import { useToggle } from '#ui/hooks/useToggle';
import { useUnmount } from '#ui/hooks/useUnmount';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';

import { useTranslationUtils } from '#i18n/utils';
import type { ManagementRoutePaths, ManagementRoutes } from '#navigation/Dashboard/Management';

type Props = {
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>;
};

export default function Prompt(props: Props) {
  const { navigation } = props;

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t } = useTranslationUtils();

  const { onLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.COOLING_USER_MODAL_STEP,
    OverlayComponent: CoolingUsersModalOverlay,
    layoutAdjustments: {
      addWidth: 20,
      addHeight: 20,
      addX: -10,
      addY: -10,
    },
  });

  useAppEventListener<[boolean]>(APP_EVENTS.DISPATCH_CU_PROMPT, setModalVisibility);

  useUnmount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={toggleVisibility} style={{ backgroundColor: 'white' }}>
        <View tw="m-0 p-0" onLayout={onLayout}>
          <Dialog.Title tw="mt-0 pt-0">
            {t('Dashboard.Management.CoolingUsers.modals.selectMethod')}
          </Dialog.Title>
          <Dialog.Content onLayout={onLayout}>
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={toggleVisibility}>{t('actions.close')}</Button>
          </Dialog.Actions>
        </View>
      </Dialog>
    </Portal>
  );
}
