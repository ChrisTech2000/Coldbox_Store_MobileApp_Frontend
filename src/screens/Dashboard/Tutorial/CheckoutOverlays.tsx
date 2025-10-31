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
const screenWidth = Dimensions.get('window').width;

const MOCKED_PARAMS = {
  user: MOCKED_USER,
  crates: MOCKED_CHECK_OUT_DATA,
  coolingUnit: MOCKED_COOLING_UNIT,
};

export function OperatorActionsOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const mainTabNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute"
        style={{
          height: mask.height,
          width: mask.width,
          top: mask.y,
          left: LanguageManager.isRTL ? screenWidth - mask.x - mask.width : mask.x,
        }}
        onPress={() => {
          mainTabNavigation.navigate('CheckOutStack', {
            screen: 'CrateSelection',
            params: MOCKED_PARAMS,
          });
          next();
        }}
      >
        <Animated.View style={[{ top: 20, opacity: blinkAnim }]}>
          <MaterialIcon
            name="touch-app"
            size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
            color={colors.green.primary}
          />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw="absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          top: Platform.OS === 'ios' ? mask.y - 150 : mask.y - 200,
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
              goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_1);
              rootNavigation.navigate('Dashboard', { screen: 'RootMainTabStack' });

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
              navigation.navigate('BillingInfo', {
                ...MOCKED_PARAMS,
                user: `${MOCKED_PARAMS.user.user.firstName} ${MOCKED_PARAMS.user.user.lastName}`,
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
  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
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
              goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_2);

              rootNavigation.navigate('CheckOutStack', {
                screen: 'CrateSelection',
                params: MOCKED_PARAMS,
              });
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
                dashboardNavigation.navigate('Marketplace', {
                  screen: 'MarketplaceRoot',
                });
                goTo(EMarketplaceTutorialSteps.MARKETPLACE_STEP_1);
              } else {
                dashboardNavigation.navigate('Dashboard', { screen: 'RootMainTabStack' });
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
              dashboardNavigation.navigate('Dashboard');
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
