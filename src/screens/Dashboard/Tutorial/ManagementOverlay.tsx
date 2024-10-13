import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';

const screenHeight = Dimensions.get('window').height;

export function ManagementOverlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <Touchable
          tw={cn(
            'absolute w-full h-14 bg-white',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-32' : 'top-40'
          )}
          onPress={() => {
            onPressMask?.();
            next();
          }}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => (
              <Text tw="text-base w-full">{t('navigation.management.CoolingUsers')}</Text>
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </Touchable>

        <View
          tw={cn(
            'absolute left-8 w-[70%] h-auto bg-white p-3 rounded-md z-40',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-44' : 'top-56'
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
          <Text tw="text-base">{t('tutorial.steps.navigateToCoolingUser')}</Text>
        </View>
      </View>
    </View>
  );
}
