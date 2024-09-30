import React from 'react';
import { Modal, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import Logo from '#assets/images/coldtivate_logo.svg';

import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

export const TutorialFinishedMessageOverlay = ({
  isWalkthroughOn,
  stop,
}: IOverlayComponentProps) => {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  return (
    <Modal transparent visible={isWalkthroughOn} animationType="fade">
      <View tw="flex-1 justify-center items-center">
        <View tw="bg-white rounded-lg w-[85%] h-auto p-4 items-center">
          <Logo width={50} height={50} tw="mb-4" />

          {t('tutorial.final')
            .split('. ')
            .map((text) => (
              <Text key={`title-${text}`} tw="text-base font-bold text-center">
                {text}
              </Text>
            ))}

          <Button
            mode="contained-tonal"
            onPress={() => {
              stop();
              toggleTutorial();
            }}
            labelStyle="text-white"
            tw="bg-green-primary border border-green-primary"
          >
            {t('tutorial.backToDashboard')}
          </Button>
        </View>
      </View>
    </Modal>
  );
};
