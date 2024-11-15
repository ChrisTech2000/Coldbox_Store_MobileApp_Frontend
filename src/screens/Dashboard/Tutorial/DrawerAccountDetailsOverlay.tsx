import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Platform, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { Icon } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';

const screenHeight = Dimensions.get('window').height;

export function DrawerAccountDetailsOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const navigation = useNavigation();

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

  /**
     
   */
  return (
    <View tw="h-full w-full absolute">
      <Touchable
        tw={cn(
          'bg-white absolute left-3 w-[60%] h-[7%] p-3 rounded-md flex flex-row items-center space-x-2',
          Platform.OS === 'ios'
            ? 'top-[15.5%]'
            : screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-[15.5%]'
              : 'top-[12.5%]'
        )}
        onPress={() => {
          // eslint-disable-next-line
          // @ts-ignore
          navigation.navigate('AccountDetails');
          next();
        }}
      >
        <Icon source="account-supervisor-outline" size={25} />
        <Text tw="text-base">{t('navigation.dashboard.AccountDetails')}</Text>
      </Touchable>

      <Animated.View
        style={[
          {
            top:
              Platform.OS === 'ios'
                ? screenHeight <= SMALL_SCREEN_THRESHOLD
                  ? '16%'
                  : '17%'
                : screenHeight <= SMALL_SCREEN_THRESHOLD
                  ? '16%'
                  : '13.5%',
            left: '50%',
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
