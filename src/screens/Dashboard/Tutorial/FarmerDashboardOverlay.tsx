import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { ECommonTutorialSteps } from './utils/constants';

export function Dashboard1Overlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-16 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.dashboardStep1')}</Text>
        <Button
          mode="text"
          labelStyle="text-green-primary"
          onPress={() => {
            onPressMask?.();
            next();
          }}
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}

export function Dashboard2Overlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-16 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.dashboardStep2')}</Text>
        <Button
          mode="text"
          labelStyle="text-green-primary"
          onPress={() => {
            onPressMask?.();

            next();
          }}
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}

export function Dashboard3Overlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 top-60 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.dashboardStep3')}</Text>
        <Button
          mode="text"
          labelStyle="text-green-primary"
          onPress={() => {
            onPressMask?.();
            next();
          }}
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}

export function Dashboard4Overlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-16 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.dashboardStep4')}</Text>
        <Button
          mode="text"
          labelStyle="text-green-primary"
          onPress={() => {
            onPressMask?.();
            next();
          }}
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}

export function Dashboard5Overlay({ goTo, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 top-60 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.dashboardStep5')}</Text>
        <Button
          mode="text"
          labelStyle="text-green-primary"
          onPress={() => {
            onPressMask?.();
            goTo(ECommonTutorialSteps.HISTORY_STEP);
          }}
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}
