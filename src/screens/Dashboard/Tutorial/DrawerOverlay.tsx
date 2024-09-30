import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';

export function DrawerOverlay({ next, step: { mask, onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute top-8 left-3 w-[10%] h-[5%]"
        onPress={() => {
          onPressMask?.();
          next();
        }}
      />
      <View
        tw="absolute bg-white p-3 rounded-md z-30"
        style={[
          {
            top: mask.y + mask.height - 10,
            left: mask.x + 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.openDrawer')}</Text>
      </View>
    </View>
  );
}
