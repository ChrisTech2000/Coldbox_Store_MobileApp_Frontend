import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Divider, List, Modal, Portal } from 'react-native-paper';

import { CoolingUsersModalOverlay } from '#screens/Dashboard/Tutorial/CoolingUserModalOverlay';
import { ETutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { useUnmount } from '#ui/hooks/useUnmount';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';

import { useTranslationUtils } from '#i18n/utils';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import type { ManagementRoutePaths, ManagementRoutes } from '#navigation/Dashboard/Management';

type Props = {
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>;
};

export default function Prompt(props: Props) {
  const { navigation } = props;
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();


  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isVisible, toggleVisibility, setModalVisibility] = useToggle(false);
  const { t } = useTranslationUtils();

  const { onLayout } = useWalkthroughStep({
    number: ETutorialSteps.COOLING_USER_MODAL,
    enableHardwareBack: true,
    maskAllowInteraction: true,
    OverlayComponent: CoolingUsersModalOverlay,
    layoutAdjustments: {
      addWidth: 20,
      addHeight: 20,
      addX: -10,
      addY: -10
    },
    onPressMask: () => {
      toggleVisibility();
      rootNavigation.navigate('RootMainTabStack');
    }
  });

  useAppEventListener<[boolean]>('DISPATCH_CU_PROMPT', setModalVisibility);

  useUnmount(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={toggleVisibility}>
        <View
          onLayout={onLayout}
          tw="w-full bg-white rounded-3xl w-2/3 max-w-2/3 h-auto pt-6 pb-4 self-center space-y-2"
        >
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
