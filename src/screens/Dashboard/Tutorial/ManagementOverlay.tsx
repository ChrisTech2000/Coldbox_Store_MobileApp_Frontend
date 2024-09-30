import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { Icon } from 'react-native-paper';

export function ManagementOverlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <TouchableOpacity
          tw="absolute left-3 top-20 w-[90%] h-16"
          onPress={() => {
            onPressMask?.();
            next();
          }}
        />

        <View
          tw="absolute left-8 top-32 w-[70%] h-auto bg-white p-3 rounded-md z-40"
          style={[
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
          ]}
        >
          <Icon source="arrow-top-left-bold-outline" size={20} />
          <Text tw="text-base">
            {t('tutorial.steps.navigateToCoolingUser')}
          </Text>
        </View>
      </View>
    </View >
  );
}
