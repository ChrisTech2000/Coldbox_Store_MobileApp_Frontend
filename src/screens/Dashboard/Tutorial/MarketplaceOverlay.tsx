import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useShallow } from 'zustand/react/shallow';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { DashboardMainRoutes } from '#navigation/Dashboard/Main';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
import { MarketplaceTabsRoutes } from '#navigation/Dashboard/Main/Marketplace/MarketplaceTabs';
import { useAuthStore } from '#stores/auth';
import { useTutorialStore } from '#stores/tutorial';
import { ERoles } from '#types/global';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';

import {
  ECommonTutorialSteps,
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
import { useBlinkAnimation } from './utils/useAnimation';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const MOCKED_PARAMS = {
  user: MOCKED_USER,
  crates: MOCKED_CHECK_OUT_DATA,
  coolingUnit: MOCKED_COOLING_UNIT,
};

export function Marketplace1ScreenOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  const [toggleTutorial] = useTutorialStore(useShallow((store) => [store.toggleTutorial]));
  const [user] = useAuthStore(useShallow((store) => [store.user]));

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-5 bottom-48 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.marketplaceStep1')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              if (user?.role === ERoles.OPERATOR) {
                goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_3);

                dashboardNavigation.navigate('Dashboard', {
                  screen: 'CheckOutStack',
                  params: {
                    screen: 'BillingInfo',
                    params: {
                      ...MOCKED_PARAMS,
                      user: `${MOCKED_PARAMS.user.user.firstName} ${MOCKED_PARAMS.user.user.lastName}`,
                    },
                  },
                });
              } else if (user?.role === ERoles.EMPLOYEE) {
                goTo(EEmployeeTutorialSteps.EMPLOYEE_COOLING_UNITS_STEP);
                dashboardNavigation.navigate('Dashboard');
              } else {
                goTo(EFarmerTutorialSteps.MARKET_PRICE);
                dashboardNavigation.navigate('MarketPrice');
              }
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={next}
            labelStyle="text-green-primary"
            contentStyle="flex flex-row-reverse"
          >
            {t('actions.continue')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function Marketplace2ScreenOverlay({
  goTo,
  stop,
  next,
  step: { mask, onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute"
        style={{
          top: mask.y,
          height: mask.height,
          width: mask.width,
          left: LanguageManager.isRTL ? screenWidth - mask.x - mask.width : mask.x,
        }}
        onPress={() => {
          onPressMask?.();
          next();
        }}
      >
        <Animated.View
          style={[
            {
              top: mask.height,
              opacity: blinkAnim,
            },
          ]}
        >
          <MaterialIcon name="touch-app" size={40} color={colors.green.primary} />
        </Animated.View>
      </TouchableOpacity>
      <View
        tw="absolute left-5 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            top: mask.y + 120,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.marketplaceStep2')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              goTo(EMarketplaceTutorialSteps.MARKETPLACE_STEP_1);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function ShoppingCartScreenOverlay({ goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-2.5 bottom-14 w-[95%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.shoppingCart')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              dashboardNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
              });
              goTo(EMarketplaceTutorialSteps.MARKETPLACE_STEP_2);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={() => {
              dashboardNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
              });
              goTo(EMarketplaceTutorialSteps.MARKETPLACE_STEP_3);
            }}
            labelStyle="text-green-primary"
            contentStyle="flex flex-row-reverse"
          >
            {t('actions.continue')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function Marketplace3ScreenOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
  const marketplaceTabsNavigation =
    useNavigation<NativeStackNavigationProp<MarketplaceTabsRoutes>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute w-[30%] h-[8%]"
        style={{
          top: mask.y,
          left: mask.x,
          height: mask.height,
          width: mask.width,
        }}
        onPress={() => {
          marketplaceTabsNavigation.navigate('MyOrders');
          next();
        }}
      >
        <Animated.View
          tw={LanguageManager.isRTL ? 'left-[-25%]' : 'right-[-25%]'}
          style={[
            {
              top: mask.height,
              opacity: blinkAnim,
            },
          ]}
        >
          <MaterialIcon name="touch-app" size={40} color={colors.green.primary} />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw="absolute left-2.5 top-60 w-[95%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.marketplaceStep3')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              rootNavigation.navigate('ShoppingCart', { screen: 'Root' });
              goTo(EMarketplaceTutorialSteps.SHOPPING_CART_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('Dashboard');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function MyOrdersScreenOverlay({ goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const [toggleTutorial] = useTutorialStore(useShallow((store) => [store.toggleTutorial]));
  const [user] = useAuthStore(useShallow((store) => [store.user]));
  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw="absolute left-2.5 bottom-14 w-[95%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.myOrders')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              dashboardNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
              });
              goTo(EMarketplaceTutorialSteps.MARKETPLACE_STEP_3);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={() => {
              switch (user?.role) {
                case ERoles.OPERATOR:
                case ERoles.COOLING_USER:
                  dashboardNavigation.navigate('Dashboard', {
                    screen: 'ProduceDetailsStack',
                    params: {
                      screen: 'Root',
                      params: MOCKED_PRODUCE_DETAILS_DATA,
                    },
                  });
                  goTo(EMarketplaceTutorialSteps.LIST_FOR_SALE_STEP);
                  break;
                default:
                  dashboardNavigation.navigate('Dashboard');
                  goTo(ECommonTutorialSteps.FINAL_STEP);
              }
            }}
            labelStyle="text-green-primary"
            contentStyle="flex flex-row-reverse"
          >
            {t('actions.continue')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function MarketplaceListing1ScreenOverlay({
  next,
  goTo,
  stop,
  step: { mask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const [toggleTutorial] = useTutorialStore(useShallow((store) => [store.toggleTutorial]));
  const [user] = useAuthStore(useShallow((store) => [store.user]));

  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute items-end z-10"
        style={{
          top: mask.y,
          height: mask.height,
          width: mask.width,
          left: mask.x,
        }}
        onPress={() => {
          dashboardNavigation.navigate('Dashboard', {
            screen: 'ProduceDetailsStack',
            params: {
              screen: 'EditCrateWeightAndPricing',
              params: {
                ...MOCKED_PRODUCE_DETAILS_DATA,
                companyCurrency: MOCKED_PRODUCE_DETAILS_DATA.currency,
              },
            },
          });
          next();
        }}
      >
        <Animated.View
          style={[
            {
              top: 30,
              opacity: blinkAnim,
            },
          ]}
        >
          <MaterialIcon name="touch-app" size={40} color={colors.green.primary} />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw={cn(
          'absolute left-2.5 w-[95%] h-auto bg-white p-3 rounded-md z-30',
          screenHeight <= SMALL_SCREEN_THRESHOLD ? 'top-32' : 'bottom-40'
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
        <Text tw="text-base">
          {user?.role === ERoles.OPERATOR
            ? t('tutorial.steps.operatorListForSale')
            : t('tutorial.steps.coolingUserListForSale')}
        </Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              dashboardNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
                // eslint-disable-next-line
                // @ts-ignore
                params: {
                  screen: 'MyOrders',
                },
              });

              setTimeout(() => {
                goTo(EMarketplaceTutorialSteps.MY_ORDERS_STEP);
              }, 150);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function MarketplaceListing2ScreenOverlay({
  next,
  goTo,
  stop,
  step: { mask, onPressMask },
}: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const [toggleTutorial] = useTutorialStore(useShallow((store) => [store.toggleTutorial]));

  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute items-start z-10"
        style={{
          top: mask.y,
          width: mask.width,
          height: mask.height,
          ...(LanguageManager.isRTL ? { right: mask.x + 15 } : { left: mask.x }),
        }}
        onPress={() => {
          onPressMask?.();
          next();
        }}
      >
        <Animated.View
          style={[
            {
              top: 25,
              left: LanguageManager.isRTL ? undefined : 40,
              right: LanguageManager.isRTL ? -40 : undefined,
              opacity: blinkAnim,
            },
          ]}
        >
          <MaterialIcon
            name="touch-app"
            size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 30 : 40}
            color={colors.green.primary}
          />
        </Animated.View>
      </TouchableOpacity>

      <View
        tw="absolute left-2.5 bottom-40 w-[95%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}
      >
        <Text tw="text-base">{t('tutorial.steps.commonListForSale')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              dashboardNavigation.navigate('Dashboard', {
                screen: 'ProduceDetailsStack',
                params: {
                  screen: 'Root',
                  params: MOCKED_PRODUCE_DETAILS_DATA,
                },
              });
              goTo(EMarketplaceTutorialSteps.LIST_FOR_SALE_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}

export function MarketplaceListing3ScreenOverlay({ goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const [toggleTutorial] = useTutorialStore(useShallow((store) => [store.toggleTutorial]));

  const dashboardNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();

  return (
    <View tw="h-full w-full absolute">
      <View
        tw={cn(
          'absolute left-2.5 w-[95%] h-auto bg-white p-3 rounded-md z-30',
          Platform.OS === 'android' && screenHeight > SMALL_SCREEN_THRESHOLD
            ? 'bottom-[55%]'
            : 'bottom-[50%]'
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
        <Text tw="text-base">{t('tutorial.steps.commonListForSalePrice')}</Text>

        <View tw="flex flex-row flex-wrap justify-center items-center mt-2">
          <Button
            icon={LanguageManager.isRTL ? 'arrow-right' : 'arrow-left'}
            mode="text"
            onPress={() => {
              dashboardNavigation.navigate('Dashboard', {
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
                          listedInTheMarketplace: false,
                        },
                        { ...MOCKED_PRODUCE_DETAILS_DATA.produce.checkedInCrates[1] },
                      ],
                    },
                    companyCurrency: MOCKED_PRODUCE_DETAILS_DATA.currency,
                  },
                },
              });
              goTo(EMarketplaceTutorialSteps.COMMON_LIST_FOR_SALE_STEP);
            }}
            labelStyle="text-green-primary"
          >
            {t('tutorial.prev')}
          </Button>

          <Button
            icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
            mode="text"
            onPress={() => {
              rootNavigation.navigate('RootMainTabStack');
              goTo(ECommonTutorialSteps.FINAL_STEP);
            }}
            labelStyle="text-green-primary"
            contentStyle="flex flex-row-reverse"
          >
            {t('actions.continue')}
          </Button>

          <Button
            mode="text"
            onPress={() => {
              stop();
              toggleTutorial(false);
              rootNavigation.navigate('RootMainTabStack');
            }}
            labelStyle="text-red-700"
          >
            {t('tutorial.quit')}
          </Button>
        </View>
      </View>
    </View>
  );
}
