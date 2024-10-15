import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { ECommonTutorialSteps } from './utils/constants';

export function CoolingUnitsMapOverlay({ goTo, step: { onPressMask } }: IOverlayComponentProps) {
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
        <Text tw="text-center text-base">{t('tutorial.steps.farmersCoolingUnits')}</Text>
        <Button
          mode="text"
          labelStyle="text-green-primary"
          onPress={() => {
            onPressMask?.();
            goTo(ECommonTutorialSteps.COOLING_UNITS_STEP);
          }}
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
