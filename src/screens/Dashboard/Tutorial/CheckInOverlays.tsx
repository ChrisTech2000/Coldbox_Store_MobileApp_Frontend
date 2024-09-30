import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import { useTranslationUtils } from '#i18n/utils';
import { useCheckInStore } from '#stores/checkIn';
import { Button } from '#ui/components/Button';
import { MOCKED_CHECK_IN_DATA } from './utils/mockedData';

export function OperatorActionsOverlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute bottom-28 right-3 w-[15%] h-[9%]"
        onPress={() => {
          onPressMask?.();
          next();
        }}
      />
      <View
        tw="absolute left-5 bottom-5 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.initiate_check_in_1')}</Text>
      </View>
    </View>
  );
}

export function CheckInButtonOverlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute bottom-28 right-1/4 w-[20%] h-[9%]"
        onPress={() => {
          onPressMask?.();
          next();
        }}
      />
      <View
        tw="absolute left-5 bottom-12 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.initiate_check_in_2')}</Text>
      </View>
    </View>
  );
}

export function CheckIn1ScreenOverlay({ next }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const setProduces = useCheckInStore((store) => store.setProduces);

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-12 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.check_in_1')}</Text>
        <Button
          mode="text"
          onPress={() => {
            // eslint-disable-next-line
            // @ts-ignore
            setProduces(MOCKED_CHECK_IN_DATA);
            next();
          }}
          labelStyle="text-green-primary"
        >
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}

export function CheckIn2ScreenOverlay({ next }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-16 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.check_in_2')}</Text>
        <Button mode="text" onPress={next} labelStyle="text-green-primary">
          {t('actions.continue')}
        </Button>
      </View>
    </View>
  );
}

export function CheckIn3ScreenOverlay({ next, step: { onPressMask } }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const resetCheckInStore = useCheckInStore((store) => store.resetCheckInStore);

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute bottom-4 right-3 w-[46%] h-[8%]"
        onPress={() => {
          onPressMask?.();
          resetCheckInStore();
          next();
        }}
      />

      <View
        tw="absolute left-5 bottom-24 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-center text-base">{t('tutorial.steps.check_in_3')}</Text>
      </View>
    </View>
  );
}
