import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardRoutes } from '#navigation/Dashboard';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';

import { EEmployeeTutorialSteps } from './utils/constants';
import { useBlinkAnimation } from './utils/useAnimation';
import { ListItemArrow } from '../AccountDetails/components/ListItemArrow';

const screenHeight = Dimensions.get('window').height;

export function ManagementCoolingUnitsOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <Touchable
          tw="absolute w-full bg-white"
          style={{
            top: mask.y,
            height: mask.height,
          }}
          onPress={() => {
            // eslint-disable-next-line
            // @ts-ignore
            rootNavigation.navigate('AddCoolingUnit');
            next();
          }}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => (
              <Text tw="text-base w-full">{t('navigation.management.CoolingUnits')}</Text>
            )}
            right={ListItemArrow}
          />

          <Animated.View
            style={[{ opacity: blinkAnim }]}
            tw={cn('-top-2/3', LanguageManager.isRTL ? '-left-2/3' : '-right-2/3')}
          >
            <MaterialIcon
              name="touch-app"
              size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
              color={colors.green.primary}
            />
          </Animated.View>
        </Touchable>

        <View
          tw={cn(
            'absolute left-8 w-[80%] h-auto bg-white p-3 rounded-md z-40',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-60' : 'top-80'
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
          <Text tw="text-base">{t('tutorial.steps.navigateToCoolingUnits')}</Text>

          <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
            <Button
              icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
              mode="text"
              onPress={() => {
                rootNavigation.navigate('Management', { screen: 'AddLocation' });
                goTo(EEmployeeTutorialSteps.ADD_LOCATION_STEP);
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
