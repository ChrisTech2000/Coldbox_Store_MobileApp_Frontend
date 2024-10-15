import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { Button } from '#ui/components/Button';
import { ERoles } from '#types/global';
import { EFarmerTutorialSteps } from './utils/constants';
import { Text } from '#ui/components/Text';

export function HistoryOverlay({ next, goTo, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);

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
          {user?.role === ERoles.COOLING_USER
            ? t('tutorial.steps.farmerHistory')
            : t('tutorial.steps.history')}
        </Text>
        <Button
          mode="text"
          onPress={() => {
            onPressMask?.();
            user?.role === ERoles.COOLING_USER
              ? goTo(EFarmerTutorialSteps.COOLING_UNITS_FARMER_STEP)
              : next();
          }}
          labelStyle="text-green-primary"
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
