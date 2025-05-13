import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { CheckOutStackRoutes } from '#navigation/Dashboard/Main/MainTabStack/CheckOutTabStack';
import { useManagementStore } from '#stores/management';
import { useTutorialStore } from '#stores/tutorial';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import { EMarketplaceTutorialSteps, EOperatorTutorialSteps } from './utils/constants';
import { MOCKED_CHECK_OUT_DATA, MOCKED_COOLING_UNIT, MOCKED_USER } from './utils/mockedData';
import { useBlinkAnimation } from './utils/useAnimation';

const screenHeight = Dimensions.get('window').height;

const MOCKED_PARAMS = {
  user: MOCKED_USER,
  crates: MOCKED_CHECK_OUT_DATA,
  coolingUnit: MOCKED_COOLING_UNIT,
};

export function OperatorActionsOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute right-14 w-[14%] h-[9%]',
          Platform.OS === 'ios' ? 'bottom-28' : 'bottom-20'
        )}
        onPress={() => {
          // eslint-disable-next-line
          // @ts-ignore
          rootNavigation.navigate('Main', {
            screen: 'Dashboard',
            params: {
              screen: 'CheckOutStack',
              params: {
                screen: 'CrateSelection',
                params: MOCKED_PARAMS,
              },
            },
          });

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
          screenHeight <= SMALL_SCREEN_THRESHOLD
            ? 'top-[27%]'
            : Platform.OS === 'ios'
              ? 'top-[60%]'
              : 'top-2/3'
        )}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <Text tw="text-base">{t('tutorial.steps.checkOut1')}</Text>

        <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              emitter.emit(APP_EVENTS.DISPATCH_CLOSE_OPERATOR_ACTIONS);
              rootNavigation.navigate('CoolingUnits', { screen: 'RoomConditions' });
              goTo(EOperatorTutorialSteps.ROOM_CONDITIONS_STEP);
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

export function CheckOutScreenOverlay({ next, goTo, stop }: IOverlayComponentProps) {
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
        <Text tw="text-base">{t('tutorial.steps.checkOut2')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('RootMainTabStack');
              goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_1);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={() => {
              navigation.navigate(
                'BillingInfo',
                // eslint-disable-next-line
                // @ts-ignore
                {
                  ...MOCKED_PARAMS,
                  user: `${MOCKED_PARAMS.user.user.firstName} ${MOCKED_PARAMS.user.user.lastName}`,
                }
              );
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

export function CheckOut2ScreenOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const { company } = useManagementStore();

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
        <Text tw="text-base">{t('tutorial.steps.checkOut3')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Main', {
                screen: 'Dashboard',
                params: {
                  screen: 'CheckOutStack',
                  params: {
                    screen: 'CrateSelection',
                    params: MOCKED_PARAMS,
                  },
                },
              });
              goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_2);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={() => {
              if (company?.country === 'NG' || company?.country === 'Nigeria') {
                // eslint-disable-next-line
                // @ts-ignore
                rootNavigation.navigate('Marketplace', {
                  screen: 'MarketplaceRoot',
                  params: {
                    screen: 'Marketplace',
                  },
                });
                goTo(EMarketplaceTutorialSteps.MARKETPLACE_STEP_1);
              } else {
                rootNavigation.navigate('RootMainTabStack');
                next();
              }
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
              rootNavigation.navigate('RootMainTabStack');
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
