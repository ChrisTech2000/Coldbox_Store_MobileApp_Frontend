import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { EFarmerTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function CoolingUserSurveyOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <View
          tw={cn(
            'absolute w-full h-auto bg-white',
            screenHeight <= SMALL_SCREEN_THRESHOLD
              ? Platform.OS === 'ios'
                ? 'top-64'
                : 'top-60'
              : Platform.OS === 'ios'
                ? 'top-72'
                : 'top-64'
          )}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => <Text tw="text-base w-full">{t('navigation.history.BaseSurvey')}</Text>}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </View>

        <View
          tw={cn(
            'absolute left-2 w-[95%] h-auto bg-white p-3 rounded-md z-40',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-80' : 'top-96'
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
          <Text tw="text-sm">{t('tutorial.steps.coolingUserSurvey')}</Text>

          <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
            <Button
              icon="arrow-left"
              mode="text"
              onPress={() => {
                goTo(EFarmerTutorialSteps.GO_TO_PERSONAL_DETAILS);
              }}
              labelStyle="text-green-primary"
            >
              {t('tutorial.prev')}
            </Button>

            <Button
              icon="arrow-right"
              mode="text"
              onPress={() => {
                rootNavigation.goBack();
                rootNavigation.dispatch(DrawerActions.openDrawer());
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
    </View>
  );
}
