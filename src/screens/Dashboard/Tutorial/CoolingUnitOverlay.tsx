import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import { useTutorialStore } from '#stores/tutorial';

import { ECommonTutorialSteps } from './utils/constants';

export function CoolingUnitOverlay({ next, goTo, stop, step }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 top-1/4 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.coolingUnitStep')}</Text>

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
            mode="text"
            onPress={() => {
              user?.role === ERoles.OPERATOR
                ? next
                : () => {
                    goTo(ECommonTutorialSteps.COOLING_UNITS_STEP);
                    step.onPressMask?.();
                  };
            }}
            tw="bg-green-primary border-green-primary"
            labelStyle="text-white"
          >
            {t('actions.continue')}
          </Button>
        </View>
      </View>
    </View>
  );
}
