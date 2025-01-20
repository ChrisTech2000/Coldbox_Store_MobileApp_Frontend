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
import { EFarmerTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function DrawerFAQOverlay({ next, goTo, stop }: IOverlayComponentProps) {
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
              ? 'top-[34.5%] h-[6%]'
              : 'top-[30%]'
        )}
      >
        <Icon source="chat-question-outline" size={25} />
        <Text tw="text-base">{t('navigation.dashboard.FAQ')}</Text>
      </View>

      <View
        tw={cn(
          'absolute left-3 w-[90%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD
            ? 'top-[55%]'
            : Platform.OS === 'ios'
              ? 'top-[42%]'
              : 'top-[45%]'
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

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => {
              goTo(EFarmerTutorialSteps.GO_TO_KNOWLEDGE_HUB_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon="arrow-right"
            mode="text"
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              // eslint-disable-next-line
              // @ts-ignore
              navigation.navigate('Dashboard');
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
