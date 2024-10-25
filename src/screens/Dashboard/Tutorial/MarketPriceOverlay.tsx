import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';

import { Text } from '#ui/components/Text';
import { ECommonTutorialSteps } from './utils/constants';

export function MarketPriceOverlay({ goTo, stop, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
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
        <Text tw="text-center text-base">{t('tutorial.steps.marketPrice')}</Text>

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
              goTo(ECommonTutorialSteps.FINAL_STEP);
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
