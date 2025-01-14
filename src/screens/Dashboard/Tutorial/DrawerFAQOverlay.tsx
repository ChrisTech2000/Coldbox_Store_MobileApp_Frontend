import React from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { Icon } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { SMALL_SCREEN_THRESHOLD, SUPER_SMALL_SCREEN_THRESHOLD } from '#constants/ui';

const screenHeight = Dimensions.get('window').height;

export function DrawerFAQOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const navigation = useNavigation();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'bg-white absolute left-3 w-[60%] h-[8%] p-3 rounded-md flex flex-row items-center space-x-2',
          screenHeight <= SMALL_SCREEN_THRESHOLD
            ? Platform.OS === 'ios'
              ? 'top-[42%]'
              : screenHeight <= SUPER_SMALL_SCREEN_THRESHOLD
                ? 'top-[44%]'
                : 'top-[40%]'
            : Platform.OS === 'ios'
              ? 'top-[32%]'
              : 'top-[30%]'
        )}
      >
        <Icon source="chat-question-outline" size={25} />
        <Text tw="text-base">{t('navigation.dashboard.FAQ')}</Text>
      </View>

      <View
        tw={cn(
          'absolute left-3 top-[45%] w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-[55%]' : 'top-[45%]'
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
        <Text tw="text-base">{t('tutorial.steps.faq')}</Text>

        <View tw="flex flex-row items-center space-x-2 justify-center mt-4">
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.quit')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              // eslint-disable-next-line
              // @ts-ignore
              navigation.navigate('Dashboard');
              next();
            }}
            tw="bg-green-primary border-green-primary"
            labelStyle="text-white"
          >
            {t('actions.continue')}
          </Button>
        </View>
      </View>
    </View>
  );
}
