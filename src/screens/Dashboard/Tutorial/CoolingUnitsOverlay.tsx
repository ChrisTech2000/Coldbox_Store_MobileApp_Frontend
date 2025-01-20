import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { CoolingUnitsTabsRoutes } from '#navigation/Dashboard/Main/CoolingUnitsTabs';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import { ECommonTutorialSteps, EFarmerTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function CoolingUnitsOverlay({ next, stop, goTo }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const navigation = useNavigation<NativeStackNavigationProp<CoolingUnitsTabsRoutes>>();

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
        <Text tw="text-base">
          {user?.role === ERoles.OPERATOR
            ? t('tutorial.steps.coolingUnits')
            : user?.role === ERoles.EMPLOYEE
              ? t('tutorial.steps.employeeCoolingUnitsStep')
              : t('tutorial.steps.farmersUnitsPlanner')}
        </Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => {
              if (user?.role === ERoles.OPERATOR) {
                rootNavigation.navigate('History');
                goTo(ECommonTutorialSteps.HISTORY_STEP);
              } else if (user?.role === ERoles.EMPLOYEE) {
                goTo(ECommonTutorialSteps.COOLING_UNIT_STEP);
              } else {
                // TODO:
              }
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon="arrow-right"
            mode="text"
            onPress={() => {
              if (user?.role === ERoles.OPERATOR) {
                navigation.navigate('RoomConditions');
                next();
              } else if (user?.role === ERoles.COOLING_USER) {
                rootNavigation.navigate('MarketPrice');
                goTo(EFarmerTutorialSteps.MARKET_PRICE);
              } else {
                rootNavigation.navigate('Dashboard');
                goTo(ECommonTutorialSteps.FINAL_STEP);
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

export function RoomConditionsOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-8' : 'bottom-12'
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
        <Text tw="text-base">{t('tutorial.steps.roomConditions')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => {
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('CoolingUnits', { screen: 'Planner' });
              goTo(ECommonTutorialSteps.COOLING_UNITS_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon="arrow-right"
            mode="text"
            onPress={() => {
              rootNavigation.navigate('RootMainTabStack');
              emitter.emit(APP_EVENTS.DISPATCH_CLOSE_OPERATOR_ACTIONS);
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
