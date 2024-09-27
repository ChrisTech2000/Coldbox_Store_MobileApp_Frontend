import React from "react";
import { Modal, View } from "react-native";
import { IOverlayComponentProps } from "react-native-interactive-walkthrough";

import Logo from '#assets/images/coldtivate_logo.svg';

import { useTranslationUtils } from "#i18n/utils";

import { Button } from "#ui/components/Button";
import { Text } from "#ui/components/Text";

export const WelcomeMessageOverlay = ({ next, isWalkthroughOn, stop }: IOverlayComponentProps) => {
  const { t } = useTranslationUtils();

  return (
    <Modal transparent visible={isWalkthroughOn} animationType="fade">
      <View tw="flex-1 justify-center items-center">
        <View tw="bg-white rounded-lg w-[85%] h-auto p-4 items-center">
          <Logo width={50} height={50} tw="mb-4" />

          {t('tutorial.welcome').split('. ').map((text) => (
            <Text
              key={`title-${text}`}
              tw="text-base font-bold text-center"
            >
              {text}
            </Text>
          ))}

          <View tw="flex flex-row space-x-2 mt-4">
            <Button
              mode="outlined"
              onPress={stop}
              labelStyle="text-green-primary"
              tw="border border-green-primary"
            >
              {t('tutorial.quit')}
            </Button>
            <Button
              mode="contained-tonal"
              onPress={next}
              labelStyle="text-white"
              tw="bg-green-primary border border-green-primary"
            >
              {t('tutorial.start')}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
