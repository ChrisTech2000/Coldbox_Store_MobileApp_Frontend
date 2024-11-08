import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

const screenHeight = Dimensions.get('window').height;

export function AddCoolingUnitOverlay({
  next,
  stop,
  step: { onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'bottom-6' : 'bottom-16'
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
        <Text tw="text-base text-center">{t('tutorial.steps.addCoolingUnits')}</Text>

        <View tw="flex flex-row space-x-2 items-center justify-center mt-4">
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
              onPressMask?.();
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
