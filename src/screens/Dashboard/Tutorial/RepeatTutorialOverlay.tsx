import React from 'react';
import { Text, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { Icon } from 'react-native-paper';

export function RepeatTutorialOverlay({ next }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="bg-white absolute left-3 top-[41%] w-[70%] h-auto p-3 rounded-md flex flex-row items-center space-x-2"
      >
        <Icon source="card-multiple-outline" size={20} />
        <Text tw="text-base">
          {t('navigation.dashboard.Tutorial')}
        </Text>
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
        <Text tw="text-base text-center">
          {t('tutorial.steps.repeatTutorial')}
        </Text>
        <Button
          mode="text"
          onPress={next}
          labelStyle="text-green-primary"
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
