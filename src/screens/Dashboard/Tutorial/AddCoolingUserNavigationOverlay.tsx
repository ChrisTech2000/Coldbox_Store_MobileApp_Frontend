import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { useBlinkAnimation } from './utils/useAnimation';
import { EOperatorTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export function AddCoolingUserNavigationOverLay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const blinkAnim = useBlinkAnimation();
  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute"
        style={{
          top: mask.y,
          left: isRTL ? screenWidth - mask.x - mask.width : mask.x,
          height: mask.height,
          width: mask.width,
        }}
        onPress={() => {
          emitter.emit(APP_EVENTS.DISPATCH_CU_PROMPT, true);
          next();
        }}
      >
        <Animated.View
          style={{
            opacity: blinkAnim,
            top: 20,
          }}
        >
          <MaterialIcon
            name="touch-app"
            size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
            color={colors.green.primary}
          />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw="absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            top: mask.y + 90,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.navigateToAddCoolingUser')}</Text>

        <View tw="flex flex-row flex-wrap-reverse justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              goTo(EOperatorTutorialSteps.LIST_COOLING_USERS_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Main', {
                screen: 'Dashboard',
                params: {
                  screen: 'RootMainTabStack',
                },
              });
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
