import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { EOperatorTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function CoolingUsersModalOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute h-auto bg-white py-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD
            ? 'bottom-1 px-2 w-[98%] left-1'
            : 'bottom-32 px-3 w-[95%] left-3'
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
        <Text>{t('tutorial.steps.addCoolingUser')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              emitter.emit(APP_EVENTS.DISPATCH_CU_PROMPT, false);
              goTo(EOperatorTutorialSteps.ADD_COOLING_USER_NAVIGATION_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={() => {
              emitter.emit(APP_EVENTS.DISPATCH_CU_PROMPT, false);
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Main', {
                screen: 'Dashboard',
              });
              next();
            }}
            labelStyle="text-green-primary"
            contentStyle="flex flex-row-reverse"
          >
            {t('actions.continue')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              emitter.emit(APP_EVENTS.DISPATCH_CU_PROMPT, false);
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Main', {
                screen: 'Dashboard',
                params: {
                  screen: 'RootMainTabStack',
                },
              });
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}
