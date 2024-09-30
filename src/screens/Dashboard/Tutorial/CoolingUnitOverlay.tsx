import React from 'react';
import { Text, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';

export function CoolingUnitOverlay({ next }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

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
        <Button mode="text" onPress={next} labelStyle="text-green-primary">
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
