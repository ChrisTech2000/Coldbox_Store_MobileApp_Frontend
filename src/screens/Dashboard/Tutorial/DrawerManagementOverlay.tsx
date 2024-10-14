import React from 'react';
import { Text, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { Icon } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import { Touchable } from '#ui/components/Touchable';

import { EEmployeeTutorialSteps } from './utils/constants';

export function DrawerManagementOverlay({
  next,
  goTo,
  step: { onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);

  return (
    <View tw="h-full w-full absolute">
      <Touchable
        tw="bg-white absolute left-3 top-[20%] w-[60%] h-[7%] p-3 rounded-md flex flex-row items-center space-x-2"
        onPress={() => {
          onPressMask?.();
          user?.role === ERoles.OPERATOR ? next() : goTo(EEmployeeTutorialSteps.LOCATIONS_STEP);
        }}
      >
        <Icon source="account-supervisor-outline" size={25} />
        <Text tw="text-base">{t('navigation.dashboard.Management')}</Text>
      </Touchable>
      <View
        tw="absolute left-3 top-1/3 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base text-center">{t('tutorial.steps.managementNavigation')}</Text>
      </View>
    </View>
  );
}
