import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';

import {
  ECommonTutorialSteps,
  EEmployeeTutorialSteps,
  EOperatorTutorialSteps,
} from './utils/constants';
import { DashboardRoutes } from 'navigation/Dashboard';

export function CoolingUnitOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 top-1/4 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.coolingUnitStep')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              if (user?.role === ERoles.OPERATOR) {
                rootNavigation.navigate('Management', { screen: 'CoolingUsers' });
                emitter.emit(APP_EVENTS.DISPATCH_CU_PROMPT, true);
                goTo(EOperatorTutorialSteps.COOLING_USER_MODAL_STEP);
              } else if (user?.role === ERoles.EMPLOYEE) {
                rootNavigation.navigate('Management', { screen: 'Root' });
                goTo(EEmployeeTutorialSteps.ADD_EMPLOYEES_OPERATORS_STEP);
              } else {
                // TODO:
              }
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={
              user?.role === ERoles.OPERATOR
                ? next
                : user?.role === ERoles.EMPLOYEE
                  ? () => {
                      goTo(EEmployeeTutorialSteps.EMPLOYEE_COOLING_UNITS_STEP);
                    }
                  : () => {
                      goTo(ECommonTutorialSteps.COOLING_UNITS_STEP);
                      rootNavigation.navigate('Main', { screen: 'CoolingUnits' });
                    }
            }
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
                // eslint-disable-next-line
                // @ts-ignore
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
