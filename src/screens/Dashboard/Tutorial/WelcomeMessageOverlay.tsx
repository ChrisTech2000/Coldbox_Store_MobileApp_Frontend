import React from 'react';
import { Modal, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import Logo from '#assets/images/coldtivate_logo.svg';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

export const WelcomeMessageOverlay = ({ next, isWalkthroughOn, stop }: IOverlayComponentProps) => {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const user = useAuthStore((store) => store.user);

  return (
    <Modal transparent visible={isWalkthroughOn} animationType="fade">
      <View tw="flex-1 justify-center items-center">
        <View tw="bg-white rounded-lg w-[85%] h-auto p-4 items-center justify-center">
          <Logo width={50} height={50} tw="mb-4" />

          {(user?.role === ERoles.COOLING_USER
            ? t('tutorial.farmerWelcome')
            : t('tutorial.welcome')
          )
            .split('! ')
            .map((text) => (
              <Text key={`title-${text}`} tw="text-base font-bold text-center">
                {text}
              </Text>
            ))}

          <View tw="flex flex-row flex-wrap-reverse justify-center items-center">
            <Button
              mode="outlined"
              onPress={() => {
                stop();
                toggleTutorial(false);
              }}
              labelStyle="text-green-primary"
              tw="border border-green-primary mr-1 mt-4"
            >
              {t('tutorial.quit')}
            </Button>
            <Button
              mode="contained-tonal"
              onPress={next}
              labelStyle="text-white"
              tw="bg-green-primary border border-green-primary ml-1 mt-4"
            >
              {t('tutorial.start')}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
