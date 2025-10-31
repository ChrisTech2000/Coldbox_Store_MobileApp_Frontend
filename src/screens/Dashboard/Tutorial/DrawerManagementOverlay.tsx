import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { ECommonTutorialSteps, EEmployeeTutorialSteps } from './utils/constants';
import { useBlinkAnimation } from './utils/useAnimation';

const screenHeight = Dimensions.get('window').height;

export function DrawerManagementOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const colors = useTailwindColors();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const navigation = useNavigation();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <Touchable
        tw="absolute left-3 p-3 flex flex-row items-center space-x-2 z-10"
        style={{
          top: mask.y,
          height: mask.height,
          width: mask.width,
        }}
        onPress={() => {
          // eslint-disable-next-line
          // @ts-ignore
          navigation.navigate('Management', { screen: 'Root' });
          user?.role === ERoles.OPERATOR ? next() : goTo(EEmployeeTutorialSteps.LOCATIONS_STEP);
        }}
      />

      <Animated.View
        style={[
          {
            top: mask.y + 10,
            left: LanguageManager.isRTL ? undefined : '40%',
            right: LanguageManager.isRTL ? '40%' : undefined,
            opacity: blinkAnim,
          },
        ]}
      >
        <MaterialIcon
          name="touch-app"
          size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
          color={colors.green.primary}
        />
      </Animated.View>

      <View
        tw="absolute left-3 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            top: mask.y + 70,
          },
        ]}
      >
        <Text tw="text-base">
          {user?.role === ERoles.EMPLOYEE
            ? t('tutorial.steps.managementNavigation')
            : t('tutorial.steps.operatorManagementNavigation')}
        </Text>

        <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => goTo(ECommonTutorialSteps.REPEAT_TUTORIAL_STEP)}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
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
