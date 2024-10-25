import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { ECommonTutorialSteps, EFarmerTutorialSteps } from './utils/constants';

export function CoolingUnitsOverlay({
  next,
  stop,
  goTo,
  step: { onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-12 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">
          {user?.role === ERoles.OPERATOR
            ? t('tutorial.steps.coolingUnitStep')
            : user?.role === ERoles.COOLING_USER
              ? t('tutorial.steps.farmersUnitsPlanner')
              : t('tutorial.steps.employeeCoolingUnitsStep')}
        </Text>

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
              onPressMask?.();
              user?.role === ERoles.OPERATOR
                ? next()
                : user?.role === ERoles.COOLING_USER
                  ? goTo(EFarmerTutorialSteps.MARKET_PRICE)
                  : goTo(ECommonTutorialSteps.FINAL_STEP);
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

export function RoomConditionsOverlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-12 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.roomConditions')}</Text>
        <Button
          mode="text"
          onPress={() => {
            onPressMask?.();
            next();
          }}
          labelStyle="text-green-primary"
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
