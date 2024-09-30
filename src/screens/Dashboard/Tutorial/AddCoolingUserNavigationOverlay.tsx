import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';

export function AddCoolingUserNavigationOverLay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute right-2 top-6 w-[15%] h-14"
        onPress={() => {
          onPressMask?.();
          next();
        }}
      />

      <View
        tw="absolute left-5 top-20 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base text-center">
          {t('tutorial.steps.navigateToAddCoolingUser')}
        </Text>
      </View>
    </View>
  );
}
