import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';

const screenHeight = Dimensions.get('window').height;

export function LocationsOverlay({ next, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

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
      <View>
        <Touchable
          tw={cn(
            'absolute w-full h-14 bg-white',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-44' : 'top-52'
          )}
          onPress={() => {
            // eslint-disable-next-line
            // @ts-ignore
            rootNavigation.navigate('AddLocation');
            next();
          }}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => <Text tw="text-base w-full">{t('navigation.management.Locations')}</Text>}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />

          <Animated.View
            style={[
              {
                opacity: blinkAnim,
              },
            ]}
            tw="-top-2/3 -right-2/3"
          >
            <MaterialIcon
              name="touch-app"
              size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
              color={colors.green.primary}
            />
          </Animated.View>
        </Touchable>

        <View
          tw={cn(
            'absolute left-8 w-[70%] h-auto bg-white p-3 rounded-md z-40',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-60' : 'top-72'
          )}
          style={[
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
          ]}
        >
          <Text tw="text-base">{t('tutorial.steps.navigateToLocations')}</Text>
          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('Dashboard');
            }}
            labelStyle="text-green-primary"
            tw="mt-4"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}
