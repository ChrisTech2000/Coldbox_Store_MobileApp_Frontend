import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Modal, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import Logo from '#assets/images/coldtivate_logo.svg';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';

import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

export const TutorialFinishedMessageOverlay = ({
  isWalkthroughOn,
  stop,
}: IOverlayComponentProps) => {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const user = useAuthStore((store) => store.user);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  return (
    <Modal transparent visible={isWalkthroughOn} animationType="fade">
      <View tw="flex-1 justify-center items-center">
        <View tw="bg-white rounded-lg w-[85%] h-auto p-4 items-center">
          <Logo width={50} height={50} tw="mb-4" />

          {(user?.role === ERoles.COOLING_USER
            ? t('tutorial.steps.farmerFinalStep')
            : t('tutorial.final')
          )
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
              toggleTutorial(false);
              rootNavigation.navigate('Dashboard');
            }}
            labelStyle="text-white"
            tw="bg-green-primary border border-green-primary mt-3"
          >
            {t('tutorial.backToDashboard')}
          </Button>
        </View>
      </View>
    </Modal>
  );
};
