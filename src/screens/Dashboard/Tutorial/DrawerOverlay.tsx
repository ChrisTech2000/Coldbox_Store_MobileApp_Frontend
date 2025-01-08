import React from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useBlinkAnimation } from './utils/useAnimation';

const screenHeight = Dimensions.get('window').height;

export function DrawerOverlay({ next, stop, step: { mask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const navigation = useNavigation();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute left-4 w-[10%] h-[5%]',
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
              left: mask.x + 25,
              opacity: blinkAnim,
              transform: [{ rotate: '270deg' }],
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
            left: mask.x / 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.openDrawer')}</Text>
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
      </View>
    </View>
  );
}
