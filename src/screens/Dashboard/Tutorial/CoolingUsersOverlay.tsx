import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

export function CoolingUsersOverlay({ next }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 top-2/3 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base text-center">{t('tutorial.steps.listCoolingUsers')}</Text>
        <Button mode="text" onPress={next} labelStyle="text-green-primary">
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
