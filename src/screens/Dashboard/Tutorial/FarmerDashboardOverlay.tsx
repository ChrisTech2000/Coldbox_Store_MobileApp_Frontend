import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { ECommonTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function Dashboard1Overlay({ next, stop, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

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

        <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              onPressMask?.();
              next();
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

export function Dashboard2Overlay({ next, stop, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-6' : 'bottom-32'
        )}
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

        <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              onPressMask?.();
              next();
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

export function Dashboard3Overlay({ next, stop, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-24' : 'top-60'
        )}
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

        <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              onPressMask?.();
              next();
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

export function Dashboard4Overlay({ next, stop, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

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

        <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              onPressMask?.();
              next();
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

export function Dashboard5Overlay({ goTo, stop, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

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

        <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              onPressMask?.();
              goTo(ECommonTutorialSteps.HISTORY_STEP);
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
