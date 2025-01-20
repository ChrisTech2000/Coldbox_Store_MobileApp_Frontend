import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { useBlinkAnimation } from './utils/useAnimation';
import { EOperatorTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function AddCoolingUserNavigationOverLay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute right-2 w-[15%] h-14',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-6' : 'top-14'
        )}
        onPress={() => {
          emitter.emit(APP_EVENTS.DISPATCH_CU_PROMPT, true);
          next();
        }}
      >
        <Animated.View
          style={[
            {
              opacity: blinkAnim,
            },
          ]}
          tw={screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-9 left-4' : 'top-8 left-5'}
        >
          <MaterialIcon
            name="touch-app"
            size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
            color={colors.green.primary}
          />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-32' : 'top-44'
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
        <Text tw="text-base">{t('tutorial.steps.navigateToAddCoolingUser')}</Text>

        <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => {
              goTo(EOperatorTutorialSteps.LIST_COOLING_USERS_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
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
