import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';

const screenHeight = Dimensions.get('window').height;

export function PersonalDetailsOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <View
          tw={cn(
            'absolute w-full h-14 bg-white',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-36' : 'top-44'
          )}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => (
              <Text tw="text-base w-full">{t('navigation.dashboard.PersonalDetails')}</Text>
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </View>

        <View
          tw={cn(
            'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-40',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-56' : 'top-64'
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
          <Text tw="text-base">{t('tutorial.steps.coolingUserCode')}</Text>

          <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
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
              onPress={next}
              tw="bg-green-primary border-green-primary"
              labelStyle="text-white"
            >
              {t('actions.continue')}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
