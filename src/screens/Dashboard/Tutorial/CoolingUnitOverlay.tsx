import React from 'react';
import { Text, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';

import { EOperatorTutorialSteps } from './utils/constants';

export function CoolingUnitOverlay({ next, goTo, step }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);

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
        <Button
          mode="text"
          onPress={
            user?.role === ERoles.OPERATOR
              ? next
              : () => {
                  goTo(EOperatorTutorialSteps.COOLING_UNITS_STEP);
                  step.onPressMask?.();
                }
          }
          labelStyle="text-green-primary"
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
