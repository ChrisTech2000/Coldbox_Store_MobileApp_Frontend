import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Modal, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import { useShallow } from 'zustand/react/shallow';

import Logo from '#assets/images/coldtivate_logo.svg';

import { DEFAULT_CUSTOMER_TYPE_COUNTRY } from '#common/RBAC/abilities';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import {
  EEmployeeTutorialSteps,
  EFarmerTutorialSteps,
  EMarketplaceTutorialSteps,
  EOperatorTutorialSteps,
} from './utils/constants';
import {
  MOCKED_CHECK_OUT_DATA,
  MOCKED_COOLING_UNIT,
  MOCKED_PRODUCE_DETAILS_DATA,
  MOCKED_USER,
} from './utils/mockedData';

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
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));
  const [company] = useManagementStore(useShallow((store) => [store.company]));
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const isFarmer = user?.role === ERoles.COOLING_USER;
  const isCompanyCountryNigeria =
    company?.country === 'NG' || company?.country === DEFAULT_CUSTOMER_TYPE_COUNTRY;
  const isFarmerCountryNigeria =
    farmerCountry === 'NG' || farmerCountry === DEFAULT_CUSTOMER_TYPE_COUNTRY;

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
              icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
              mode="text"
              onPress={() => {
                if (
                  (isFarmer && isFarmerCountryNigeria) ||
                  (!isFarmer && isCompanyCountryNigeria)
                ) {
                  switch (user?.role) {
                    case ERoles.OPERATOR:
                    case ERoles.COOLING_USER:
                      rootNavigation.navigate('Dashboard', {
                        screen: 'ProduceDetailsStack',
                        params: {
                          screen: 'EditCrateWeightAndPricing',
                          params: {
                            ...MOCKED_PRODUCE_DETAILS_DATA,
                            produce: {
                              ...MOCKED_PRODUCE_DETAILS_DATA.produce,
                              checkedInCrates: [
                                {
                                  ...MOCKED_PRODUCE_DETAILS_DATA.produce.checkedInCrates[0],
                                  listedInTheMarketplace: true,
                                },
                                { ...MOCKED_PRODUCE_DETAILS_DATA.produce.checkedInCrates[1] },
                              ],
                            },
                            companyCurrency: MOCKED_PRODUCE_DETAILS_DATA.currency,
                          },
                        },
                      });

                      setTimeout(() => {
                        goTo(EMarketplaceTutorialSteps.COMMON_LIST_FOR_SALE_PRICE_STEP);
                      }, 150);
                      break;
                    default:
                      rootNavigation.navigate('Marketplace');
                      goTo(EMarketplaceTutorialSteps.MY_ORDERS_STEP);
                  }
                  return;
                }

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

                  setTimeout(() => {
                    goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_3);
                  }, 150);
                } else if (user?.role === ERoles.EMPLOYEE) {
                  goTo(EEmployeeTutorialSteps.EMPLOYEE_COOLING_UNITS_STEP);
                } else {
                  rootNavigation.navigate('MarketPrice');

                  setTimeout(() => {
                    goTo(EFarmerTutorialSteps.MARKET_PRICE);
                  }, 150);
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
