import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { cn } from '#ui/lib/cn';
import { Text } from '#ui/components/Text';

const screenHeight = Dimensions.get('window').height;

export function LocalizationPreferencesOverlay({ next }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="h-full w-full absolute">
      <View>
        <View
          tw={cn(
            'absolute w-full h-14 bg-white',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-44' : 'top-56'
          )}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => (
              <Text tw="text-base w-full">{t('navigation.dashboard.LocalizationPreferences')}</Text>
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </View>

        <View
          tw={cn(
            'absolute left-8 w-[80%] h-auto bg-white p-3 rounded-md z-40',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-72' : 'top-80'
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
          <Text tw="text-base">{t('tutorial.steps.localizationPreferences')}</Text>
          <Button mode="text" onPress={next} labelStyle="text-green-primary">
            {t('actions.continue')}
          </Button>
        </View>
      </View>
    </View>
  );
}
