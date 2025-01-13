import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { useCheckInStore } from '#stores/checkIn';
import { useTutorialStore } from '#stores/tutorial';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';

import { MOCKED_CHECK_IN_DATA, MOCKED_COOLING_UNIT, MOCKED_USER } from './utils/mockedData';
import { useBlinkAnimation } from './utils/useAnimation';

const screenHeight = Dimensions.get('window').height;

export function OperatorActionsOverlay({
  next,
  stop,
  step: { onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute right-3 w-[15%] h-[8%]',
          Platform.OS === 'ios' ? 'bottom-28' : 'bottom-20'
        )}
        onPress={() => {
          onPressMask?.();
          next();
        }}
      >
        <Animated.View
          style={[
            {
              opacity: blinkAnim,
              transform: [{ rotate: '90deg' }],
              top: screenHeight <= SMALL_SCREEN_THRESHOLD ? 25 : 50,
              left: -40,
            },
          ]}
          tw="-top-2/3 -right-2/3"
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
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-60' : 'top-[65%]'
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
        <Text tw="text-base">{t('tutorial.steps.initiateCheckIn1')}</Text>
        <Button
          mode="text"
          onPress={() => {
            stop();
            toggleTutorial(false);
            rootNavigation.navigate('Dashboard');
          }}
          labelStyle="text-green-primary"
          tw="mt-4"
        >
          {t('tutorial.quit')}
        </Button>
      </View>
    </View>
  );
}

export function CheckInButtonOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute right-1/4 w-[20%] h-[9%]',
          Platform.OS === 'ios' ? 'bottom-28' : 'bottom-20'
        )}
        onPress={() => {
          navigation.navigate('CheckInStack', {
            screen: 'CheckIn',
            // eslint-disable-next-line
            // @ts-ignore
            params: { user: MOCKED_USER, coolingUnit: MOCKED_COOLING_UNIT },
          }),
            next();
        }}
      >
        <Animated.View
          style={[
            {
              opacity: blinkAnim,
              transform: [{ rotate: '90deg' }],
              top: screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 60,
              left: screenHeight <= SMALL_SCREEN_THRESHOLD ? -45 : -30,
            },
          ]}
          tw="-top-2/3 -right-2/3"
        >
          <MaterialIcon
            name="touch-app"
            size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
            color={colors.green.primary}
          />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw="absolute left-5 bottom-48 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.initiateCheckIn2')}</Text>
        <Button
          mode="text"
          onPress={() => {
            stop();
            toggleTutorial(false);
            rootNavigation.navigate('Dashboard');
          }}
          labelStyle="text-green-primary"
        >
          {t('tutorial.quit')}
        </Button>
      </View>
    </View>
  );
}

export function CheckIn1ScreenOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const setProduces = useCheckInStore((store) => store.setProduces);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-4' : 'bottom-12'
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
        <Text tw="text-base">{t('tutorial.steps.checkIn1')}</Text>

        <View tw="flex flex-row space-x-2 items-center justify-center mt-2">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              // eslint-disable-next-line
              // @ts-ignore
              setProduces(MOCKED_CHECK_IN_DATA);
              next();
            }}
            labelStyle="text-white"
            tw="bg-green-primary"
          >
            {t('actions.continue')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function CheckIn2ScreenOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-8' : 'bottom-16'
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
        <Text tw="text-base">{t('tutorial.steps.checkIn2')}</Text>

        <View tw="flex flex-row space-x-2 items-center justify-center mt-2">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button mode="text" onPress={next} labelStyle="text-white" tw="bg-green-primary">
            {t('actions.continue')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function CheckIn3ScreenOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const resetCheckInStore = useCheckInStore((store) => store.resetCheckInStore);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const bottomTabNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute bottom-4 right-3 w-[46%] h-[8%]"
        onPress={() => {
          bottomTabNavigation.navigate('Main', { screen: 'History' });
          resetCheckInStore();
          next();
        }}
      >
        <Animated.View
          style={[
            {
              opacity: blinkAnim,
              transform: [{ rotate: '180deg' }],
              top: screenHeight <= SMALL_SCREEN_THRESHOLD ? -15 : Platform.OS === 'ios' ? -35 : -5,
              left: screenHeight <= SMALL_SCREEN_THRESHOLD ? -70 : -90,
            },
          ]}
          tw="-right-2/3 -top-2/3"
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
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-32' : 'bottom-40'
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
        <Text tw="text-base">{t('tutorial.steps.checkIn3')}</Text>
        <Button
          mode="text"
          onPress={() => {
            stop();
            toggleTutorial(false);
            rootNavigation.navigate('RootMainTabStack');
          }}
          labelStyle="text-green-primary"
          tw="mt-2"
        >
          {t('tutorial.quit')}
        </Button>
      </View>
    </View>
  );
}
