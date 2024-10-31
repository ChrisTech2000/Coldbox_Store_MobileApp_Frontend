import React from 'react';
import { Dimensions, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { List } from 'react-native-paper';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { useTranslationUtils } from '#i18n/utils';
import { Button } from '#ui/components/Button';
import { cn } from '#ui/lib/cn';
import { Text } from '#ui/components/Text';
import { useTutorialStore } from '#stores/tutorial';

import { EOperatorTutorialSteps } from './utils/constants';

const screenHeight = Dimensions.get('window').height;

export function ManagementEmployeesOperatorsOverlay({
  goTo,
  stop,
  step: { onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);

  return (
    <View tw="h-full w-full absolute">
      <View>
        <View
          tw={cn(
            'absolute w-full h-28 bg-white',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-72' : 'top-80'
          )}
        >
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => <Text tw="text-base w-full">{t('navigation.management.Operators')}</Text>}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            tw="pl-4 pr-7 py-2 w-[90%]"
            title={undefined}
            left={() => (
              <Text tw="text-base w-full">{t('navigation.management.RegisteredEmployee')}</Text>
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </View>

        <View
          tw={cn(
            'absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-40 items-center',
            screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-16' : 'top-24'
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
          <Text tw="text-base text-center">{t('tutorial.steps.addEmployeesOperators')}</Text>

          <View tw="flex flex-row space-x-2 mt-2 items-center justify-center">
            <Button
              mode="text"
              onPress={() => {
                stop();
                toggleTutorial(false);
              }}
              labelStyle="text-green-primary"
            >
              {t('tutorial.quit')}
            </Button>
            <Button
              mode="text"
              onPress={() => {
                onPressMask?.();
                goTo(EOperatorTutorialSteps.COOLING_UNIT_STEP);
              }}
              labelStyle="text-white"
              tw="bg-green-primary"
            >
              {t('actions.continue')}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
