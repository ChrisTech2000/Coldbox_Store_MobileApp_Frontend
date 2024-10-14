import React from 'react';
import { Text, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { Icon } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import { Button } from '#ui/components/Button';

import { EFarmerTutorialSteps } from './utils/constants';

export function RepeatTutorialOverlay({ next, goTo }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);

  return (
    <View tw="h-full w-full absolute">
      <View tw="bg-white absolute left-3 top-[41%] w-[60%] h-auto p-3 rounded-md flex flex-row items-center space-x-2">
        <Icon source="card-multiple-outline" size={20} />
        <Text tw="text-base">{t('navigation.dashboard.Tutorial')}</Text>
      </View>
      <View
        tw="absolute left-3 top-1/2 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base text-center">{t('tutorial.steps.repeatTutorial')}</Text>
        <Button
          mode="text"
          onPress={
            user?.role === ERoles.COOLING_USER
              ? () => goTo(EFarmerTutorialSteps.GO_TO_ACCOUNT_DETAILS_STEP)
              : next
          }
          labelStyle="text-green-primary"
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
