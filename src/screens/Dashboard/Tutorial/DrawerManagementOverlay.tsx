import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { Icon } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { Button } from '#ui/components/Button';
import { useTutorialStore } from '#stores/tutorial';

import { EEmployeeTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function DrawerManagementOverlay({
  next,
  goTo,
  stop,
  step: { onPressMask, mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const user = useAuthStore((store) => store.user);
  const colors = useTailwindColors();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startBlinking = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startBlinking();
  }, [blinkAnim]);

  return (
    <View tw="h-full w-full absolute">
      <Touchable
        tw={cn(
          'bg-white absolute left-3 w-[60%] h-[7%] p-3 rounded-md flex flex-row items-center space-x-2',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-[22%]' : 'top-[20%]'
        )}
        onPress={() => {
          onPressMask?.();
          user?.role === ERoles.OPERATOR ? next() : goTo(EEmployeeTutorialSteps.LOCATIONS_STEP);
        }}
      >
        <Icon source="account-supervisor-outline" size={25} />
        <Text tw="text-base">{t('navigation.dashboard.Management')}</Text>
      </Touchable>

      <Animated.View
        style={[
          {
            top: mask.y + mask.height - (screenHeight <= SMALL_SCREEN_THRESHOLD ? 55 : 45),
            right: mask.x + (screenHeight <= SMALL_SCREEN_THRESHOLD ? 90 : 70),
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
        tw="absolute left-3 top-1/3 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base text-center">{t('tutorial.steps.managementNavigation')}</Text>
        <Button
          mode="text"
          onPress={() => {
            stop();
            toggleTutorial();
          }}
          labelStyle="text-green-primary"
          tw="mt-4"
        >
          {t('tutorial.quit')}
        </Button>
      </View>
    </View>
  );
}
