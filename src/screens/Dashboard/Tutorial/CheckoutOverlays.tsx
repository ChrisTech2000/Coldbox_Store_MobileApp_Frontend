import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { useTutorialStore } from '#stores/tutorial';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { cn } from '#ui/lib/cn';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';

import { MOCKED_CHECK_OUT_DATA, MOCKED_COOLING_UNIT, MOCKED_USER } from './utils/mockedData';
import { CheckOutStackRoutes } from 'navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';

const screenHeight = Dimensions.get('window').height;

const MOCKED_PARAMS = {
  user: MOCKED_USER,
  crates: MOCKED_CHECK_OUT_DATA,
  coolingUnit: MOCKED_COOLING_UNIT,
};

export function OperatorActionsOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const navigation = useNavigation<NativeStackNavigationProp<CheckOutStackRoutes>>();

  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startBlinking = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startBlinking();
  }, [blinkAnim]);

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute bottom-28 right-14 w-[14%] h-[9%]"
        onPress={() => {
          navigation.navigate('CrateSelection', {
            // eslint-disable-next-line
            // @ts-ignore
            MOCKED_PARAMS,
          }),
            next();
        }}
      >
        <Animated.View
          style={[
            {
              top: screenHeight <= SMALL_SCREEN_THRESHOLD ? 22 : 45,
              left: -40,
              opacity: blinkAnim,
              transform: [{ rotate: '90deg' }],
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
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-[27%]' : 'top-2/3'
        )}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.checkOut1')}</Text>
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

export function CheckOutScreenOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const navigation = useNavigation<NativeStackNavigationProp<CheckOutStackRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-4' : 'bottom-16'
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
        <Text tw="text-center text-base">{t('tutorial.steps.checkOut2')}</Text>

        <View tw="flex flex-row space-x-2 items-center justify-center mt-2">
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
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate(
                'BillingInfo',
                // eslint-disable-next-line
                // @ts-ignore
                { ...MOCKED_PARAMS }
              );
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

export function CheckOut2ScreenOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

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
        <Text tw="text-center text-base">{t('tutorial.steps.checkOut3')}</Text>

        <View tw="flex flex-row space-x-2 items-center justify-center mt-2">
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
          <Button
            mode="text"
            onPress={() => {
              rootNavigation.navigate('Dashboard');
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
