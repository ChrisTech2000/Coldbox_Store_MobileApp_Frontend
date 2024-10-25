import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { Icon } from 'react-native-paper';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { EFarmerTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function RepeatTutorialOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'bg-white absolute left-3 w-[60%] h-auto p-3 rounded-md flex flex-row items-center space-x-2',
          user?.role === ERoles.COOLING_USER
            ? screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-[31%]'
              : 'top-[27%]'
            : 'top-[41%]'
        )}
      >
        <Icon source="card-multiple-outline" size={20} />
        <Text tw="text-base">{t('navigation.dashboard.Tutorial')}</Text>
      </View>

      <View
        tw={cn(
          'absolute left-3 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          user?.role === ERoles.COOLING_USER
            ? screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-[40%]'
              : 'top-1/3'
            : 'top-1/2'
        )}
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

        <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial();
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="contained"
            onPress={
              user?.role === ERoles.COOLING_USER
                ? () => goTo(EFarmerTutorialSteps.GO_TO_ACCOUNT_DETAILS_STEP)
                : next
            }
            labelStyle="text-white"
            tw="bg-green-primary border-green-primary"
          >
            {t('actions.continue')}
          </Button>
        </View>
      </View>
    </View>
  );
}
