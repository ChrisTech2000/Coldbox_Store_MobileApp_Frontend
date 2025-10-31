import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { EFarmerTutorialSteps } from './utils/constants';

export function DrawerFAQOverlay({ next, goTo, stop, step: { mask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const navigation = useNavigation();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-3 bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            top: mask.y + 90,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.faq')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              goTo(EFarmerTutorialSteps.GO_TO_KNOWLEDGE_HUB_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
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
