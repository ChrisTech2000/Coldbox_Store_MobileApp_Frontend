import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { ECommonTutorialSteps } from './utils/constants';
import { useBlinkAnimation } from './utils/useAnimation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DashboardRoutes } from 'navigation/Dashboard';

const screenHeight = Dimensions.get('window').height;

export function DrawerAccountDetailsOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const navigation = useNavigation<NativeStackNavigationProp<DashboardRoutes>>();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <Touchable
        tw="absolute z-10"
        style={{
          top: mask.y,
          height: mask.height,
          width: mask.width,
        }}
        onPress={() => {
          navigation.navigate('AccountDetails', { screen: 'Root' });
          next();
        }}
      />

      <Animated.View
        style={[
          {
            top: mask.y + 10,
            left: LanguageManager.isRTL ? undefined : mask.x + mask.width / 2,
            right: LanguageManager.isRTL ? mask.x + 0.25 * mask.width : undefined,
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
        tw="absolute left-3 top-1/4 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.accountDetailsNavigation')}</Text>

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
