import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';

import { ECommonTutorialSteps } from './utils/constants';
import { useBlinkAnimation } from './utils/useAnimation';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export function DrawerOverlay({ next, stop, goTo, step: { mask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const navigation = useNavigation();

  const blinkAnim = useBlinkAnimation();
  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute w-[10%] h-[5%] left-4',
          Platform.OS === 'ios'
            ? screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-8'
              : 'top-14'
            : screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-10'
              : 'top-16'
        )}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
          next();
        }}
      >
        <Animated.View
          style={[
            {
              top: mask.y + mask.height - (screenHeight <= SMALL_SCREEN_THRESHOLD ? 80 : 110),
              [isRTL ? 'right' : 'left']: isRTL ? (screenWidth - mask.x) / 2 - 45 : mask.x + 25,
              opacity: blinkAnim,
              transform: [{ rotate: isRTL ? '90deg' : '270deg' }],
            },
          ]}
        >
          <Icon name="touch-app" size={40} color={colors.green.primary} />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw="absolute bg-white p-3 rounded-md z-30"
        style={[
          {
            top: mask.y + mask.height + 10,
            [isRTL ? 'right' : 'left']: isRTL ? (screenWidth - mask.x) / 2 : mask.x / 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.openDrawer')}</Text>

        <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => goTo(ECommonTutorialSteps.INITIAL_STEP)}
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
