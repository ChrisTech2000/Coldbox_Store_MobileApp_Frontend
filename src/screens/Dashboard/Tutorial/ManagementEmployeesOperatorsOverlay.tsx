import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { ECommonTutorialSteps, EEmployeeTutorialSteps } from './utils/constants';
import { ListItemArrow } from '../AccountDetails/components/ListItemArrow';

export function ManagementEmployeesOperatorsOverlay({
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <View
          tw="absolute w-full bg-white"
          style={{
            top: mask.y,
            height: mask.height * 2,
          }}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => <Text tw="text-base w-full">{t('navigation.management.Operators')}</Text>}
            right={ListItemArrow}
          />
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => (
              <Text tw="text-base w-full">{t('navigation.management.RegisteredEmployee')}</Text>
            )}
            right={ListItemArrow}
          />
        </View>

        <View
          tw="absolute left-2 w-[95%] h-auto bg-white p-3 rounded-md z-40 items-center"
          style={[
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              top: mask.y + mask.height * 3,
            },
          ]}
        >
          <Text tw="text-base">{t('tutorial.steps.addEmployeesOperators')}</Text>

          <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
            <Button
              icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
              mode="text"
              onPress={() => {
                rootNavigation.navigate('Management', { screen: 'AddCoolingUnit' });
                goTo(EEmployeeTutorialSteps.ADD_COOLING_UNIT_STEP);
              }}
              labelStyle="text-green-primary"
            >
              {t('tutorial.prev')}
            </Button>

            <Button
              icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
              mode="text"
              onPress={() => {
                rootNavigation.goBack();
                goTo(ECommonTutorialSteps.COOLING_UNIT_STEP);
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
    </View>
  );
}
