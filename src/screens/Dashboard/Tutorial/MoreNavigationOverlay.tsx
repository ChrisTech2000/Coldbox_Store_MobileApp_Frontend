import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { useCheckInStore } from '#stores/checkIn';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { EOperatorTutorialSteps } from './utils/constants';
import { MOCKED_CHECK_IN_DATA, MOCKED_COOLING_UNIT, MOCKED_USER } from './utils/mockedData';

const screenHeight = Dimensions.get('window').height;

export function MoreNavigationOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const setProduces = useCheckInStore((store) => store.setProduces);

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-72' : 'top-[65%]'
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
        <Text tw="text-base">{t('tutorial.steps.more')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => {
              // eslint-disable-next-line
              // @ts-ignore
              setProduces(MOCKED_CHECK_IN_DATA);
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('CheckInStack', {
                screen: 'CheckIn',
                // eslint-disable-next-line
                // @ts-ignore
                params: { user: MOCKED_USER, coolingUnit: MOCKED_COOLING_UNIT },
              });

              goTo(EOperatorTutorialSteps.CHECK_IN_STEP_3);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon="arrow-right"
            mode="text"
            onPress={() => {
              rootNavigation.navigate('History');
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
              rootNavigation.navigate('Dashboard');
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
