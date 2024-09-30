import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';

const screenHeight = Dimensions.get('window').height;

export function AddCoolingUserNavigationOverLay({
  next,
  step: { onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute right-2 w-[15%] h-14',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-6' : 'top-14'
        )}
        onPress={() => {
          onPressMask?.();
          next();
        }}
      />

      <View
        tw="absolute left-5 top-32 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base text-center">{t('tutorial.steps.navigateToAddCoolingUser')}</Text>
      </View>
    </View>
  );
}
