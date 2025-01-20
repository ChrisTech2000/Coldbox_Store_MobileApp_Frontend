import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Modal, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';

import Logo from '#assets/images/coldtivate_logo.svg';

import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';

import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { EEmployeeTutorialSteps, EOperatorTutorialSteps } from './utils/constants';
import { MOCKED_CHECK_OUT_DATA, MOCKED_COOLING_UNIT, MOCKED_USER } from './utils/mockedData';

const MOCKED_PARAMS = {
  user: MOCKED_USER,
  crates: MOCKED_CHECK_OUT_DATA,
  coolingUnit: MOCKED_COOLING_UNIT,
};

export const TutorialFinishedMessageOverlay = ({
  isWalkthroughOn,
  stop,
  goTo,
}: IOverlayComponentProps) => {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const user = useAuthStore((store) => store.user);
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  return (
    <Modal transparent visible={isWalkthroughOn} animationType="fade">
      <View tw="flex-1 justify-center items-center">
        <View tw="bg-white rounded-lg w-[85%] h-auto p-4 items-center">
          <Logo width={50} height={50} tw="mb-4" />

          {(user?.role === ERoles.COOLING_USER
            ? t('tutorial.steps.farmerFinalStep')
            : t('tutorial.final')
          )
            .split('. ')
            .map((text) => (
              <Text key={`title-${text}`} tw="text-base font-bold text-center">
                {text}
              </Text>
            ))}

          <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
            <Button
              icon="arrow-left"
              mode="text"
              onPress={() => {
                if (user?.role === ERoles.OPERATOR) {
                  // eslint-disable-next-line
                  // @ts-ignore
                  rootNavigation.navigate('Main', {
                    screen: 'Dashboard',
                    params: {
                      screen: 'CheckOutStack',
                      params: {
                        screen: 'BillingInfo',
                        params: {
                          ...MOCKED_PARAMS,
                          user: `${MOCKED_PARAMS.user.user.firstName} ${MOCKED_PARAMS.user.user.lastName}`,
                        },
                      },
                    },
                  });

                  goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_3);
                } else if (user?.role === ERoles.EMPLOYEE) {
                  goTo(EEmployeeTutorialSteps.EMPLOYEE_COOLING_UNITS_STEP);
                } else {
                  // TODO:
                }
              }}
              labelStyle="text-green-primary"
            >
              {t('tutorial.prev')}
            </Button>

            <Button
              mode="contained-tonal"
              onPress={() => {
                stop();
                toggleTutorial(false);
                rootNavigation.navigate('Dashboard');
              }}
              labelStyle="text-white"
              tw="bg-green-primary border border-green-primary mt-3"
            >
              {t('tutorial.backToDashboard')}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
