import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';
import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';

const screenHeight = Dimensions.get('window').height;

export function ManagementOverlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <TouchableOpacity
          tw={cn(
            'absolute left-3 w-[90%] h-16',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-20' : 'top-32'
          )}
          onPress={() => {
            onPressMask?.();
            next();
          }}
        />

        <View
          tw={cn(
            'absolute left-8 w-[70%] h-auto bg-white p-3 rounded-md z-40',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-32' : 'top-44'
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
