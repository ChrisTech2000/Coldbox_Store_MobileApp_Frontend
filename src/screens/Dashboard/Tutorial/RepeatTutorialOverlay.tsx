import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { ECommonTutorialSteps, EFarmerTutorialSteps } from './utils/constants';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export function RepeatTutorialOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const navigation = useNavigation();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn('absolute left-3 w-[90%] h-auto bg-white p-3 rounded-md z-30')}
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            top: mask.y + 70,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.repeatTutorial')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              goTo(ECommonTutorialSteps.OPEN_DRAWER_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={
              user?.role === ERoles.COOLING_USER
                ? () => goTo(EFarmerTutorialSteps.GO_TO_ACCOUNT_DETAILS_STEP)
                : next
            }
            labelStyle="text-green-primary"
            contentStyle="flex flex-row-reverse"
          >
            {t('actions.continue')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}
