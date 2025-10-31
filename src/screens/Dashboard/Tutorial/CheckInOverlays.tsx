import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { useCheckInStore } from '#stores/checkIn';
import { useTutorialStore } from '#stores/tutorial';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import { ECommonTutorialSteps, EOperatorTutorialSteps } from './utils/constants';
import { MOCKED_CHECK_IN_DATA, MOCKED_COOLING_UNIT, MOCKED_USER } from './utils/mockedData';
import { useBlinkAnimation } from './utils/useAnimation';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export function OperatorActionsOverlay({
  next,
  stop,
  goTo,
  step: { onPressMask, mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const blinkAnim = useBlinkAnimation();
  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute"
        style={{
          top: mask.y,
          left: isRTL ? screenWidth - mask.x - mask.width : mask.x,
          height: mask.height,
          width: mask.width,
        }}
        onPress={() => {
          onPressMask?.();
          next();
        }}
      >
        <Animated.View
          style={[
            {
              opacity: blinkAnim,
              transform: [{ rotate: '90deg' }, ...(isRTL ? [{ scaleY: -1 }] : [])],
              top: mask.height / 2,
              right: isRTL ? mask.x * 2 + 10 : mask.width - 5,
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
          screenHeight <= SMALL_SCREEN_THRESHOLD
            ? 'top-60'
            : Platform.OS === 'ios'
              ? 'top-[60%]'
              : 'top-[65%]'
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
        <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              goTo(ECommonTutorialSteps.COOLING_UNIT_STEP);
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
              rootNavigation.navigate('Main', {
                screen: 'Dashboard',
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

export function CheckInButtonOverlay({ next, stop, goTo, step: { mask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();
  const navigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  const blinkAnim = useBlinkAnimation();
  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute"
        style={{
          top: mask.y,
          left: isRTL ? screenWidth - mask.x - mask.width : mask.x,
        }}
        onPress={() => {
          navigation.navigate('CheckInStack', {
            screen: 'CheckIn',
            params: { user: MOCKED_USER, coolingUnit: MOCKED_COOLING_UNIT, isTutorial: true },
          });
          next();
        }}
      >
        <Animated.View
          style={[
            {
              opacity: blinkAnim,
              transform: [{ rotate: '90deg' }, ...(isRTL ? [{ scaleY: -1 }] : [])],
              top: mask.height / 2 - 10,
              right: isRTL ? mask.x * 2 + 10 : mask.width - 5,
              left: screenHeight <= SMALL_SCREEN_THRESHOLD ? -45 : -30,
            },
          ]}
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
        <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              emitter.emit(APP_EVENTS.DISPATCH_CLOSE_OPERATOR_ACTIONS);
              goTo(EOperatorTutorialSteps.INITIATE_CHECK_IN_STEP_1);
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
              rootNavigation.navigate('Main', {
                screen: 'Dashboard',
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

export function CheckIn1ScreenOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const setProduces = useCheckInStore((store) => store.setProduces);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const mainTabNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

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

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              goTo(EOperatorTutorialSteps.INITIATE_CHECK_IN_STEP_2);
              mainTabNavigation.navigate('RootMainTabStack');

              setTimeout(() => {
                emitter.emit(APP_EVENTS.DISPATCH_OPEN_OPERATOR_ACTIONS);
              }, 100);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={() => {
              // eslint-disable-next-line
              // @ts-ignore
              setProduces(MOCKED_CHECK_IN_DATA);
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
              mainTabNavigation.navigate('RootMainTabStack');
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

export function CheckIn2ScreenOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();
  const setProduces = useCheckInStore((store) => store.setProduces);

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

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              setProduces([]);
              goTo(EOperatorTutorialSteps.CHECK_IN_STEP_1);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={next}
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
              rootNavigation.navigate('Main', {
                screen: 'Dashboard',
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

export function CheckIn3ScreenOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const resetCheckInStore = useCheckInStore((store) => store.resetCheckInStore);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const bottomTabNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const colors = useTailwindColors();
  const blinkAnim = useBlinkAnimation();

  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute"
        style={{
          top: mask.y,
          left: isRTL ? screenWidth - mask.x - mask.width : mask.x,
          height: mask.height,
          width: mask.width,
        }}
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
              bottom: mask.height,
              left: isRTL ? mask.width - 90 : -mask.width + 90,
            },
          ]}
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

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              goTo(EOperatorTutorialSteps.CHECK_IN_STEP_2);
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
              bottomTabNavigation.navigate('Main', {
                screen: 'Dashboard',
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
