import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import { IOverlayComponentProps } from 'react-native-interactive-walkthrough';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useShallow } from 'zustand/react/shallow';

import { MEDIUM_SCREEN_THRESHOLD, SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { MainTabStackRoutes } from '#navigation/Dashboard/Main/MainTabStack';
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

const MOCKED_PARAMS = {
  user: MOCKED_USER,
  crates: MOCKED_CHECK_OUT_DATA,
  coolingUnit: MOCKED_COOLING_UNIT,
};

export function Marketplace1ScreenOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const colors = useTailwindColors();

  const [toggleTutorial] = useTutorialStore(useShallow((store) => [store.toggleTutorial]));
  const [user] = useAuthStore(useShallow((store) => [store.user]));

  return (
    <View tw="h-full w-full absolute">
      <Icon
        style={[
          {
            top:
              Platform.OS === 'ios' || screenHeight <= SMALL_SCREEN_THRESHOLD
                ? screenHeight - 100
                : screenHeight - 20,
            left: LanguageManager.isRTL ? undefined : '-35%',
            right: LanguageManager.isRTL ? '-55%' : undefined,
            transform: [{ rotate: '165deg' }],
          },
        ]}
        name="cursor-pointer"
        size={screenHeight <= SMALL_SCREEN_THRESHOLD ? 35 : 40}
        color={colors.green.primary}
      />

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
                rootNavigation.navigate('CheckOutStack', {
                  screen: 'BillingInfo',
                  params: {
                    ...MOCKED_PARAMS,
                    // eslint-disable-next-line
                    // @ts-ignore
                    user: `${MOCKED_PARAMS.user.user.firstName} ${MOCKED_PARAMS.user.user.lastName}`,
                  },
                });
                goTo(EOperatorTutorialSteps.CHECK_OUT_STEP_3);
              } else if (user?.role === ERoles.EMPLOYEE) {
                rootNavigation.navigate('RootMainTabStack');
                goTo(EEmployeeTutorialSteps.EMPLOYEE_COOLING_UNITS_STEP);
              } else {
                // eslint-disable-next-line
                // @ts-ignore
                rootNavigation.navigate('MarketPrice');
                goTo(EFarmerTutorialSteps.MARKET_PRICE);
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
        tw={cn(
          'absolute w-[13%] h-[7%] right-1',
          Platform.OS === 'ios'
            ? screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-8'
              : 'top-14'
            : screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-10'
              : 'top-16'
        )}
        onPress={() => {
          onPressMask?.();
          next();
        }}
      >
        <Animated.View
          style={[
            {
              top: mask.y + mask.height - (screenHeight <= SMALL_SCREEN_THRESHOLD ? 50 : 70),
              opacity: blinkAnim,
            },
          ]}
        >
          <MaterialIcon name="touch-app" size={40} color={colors.green.primary} />
        </Animated.View>
      </TouchableOpacity>
      <View
        tw="absolute left-5 top-48 w-[90%] h-auto bg-white p-3 rounded-md z-30"
        style={[
          {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
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

export function ShoppingCartScreenOverlay({ next, goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const toggleTutorial = useTutorialStore((store) => store.toggleTutorial);
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
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
                params: {
                  screen: 'Marketplace',
                },
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
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
                params: {
                  screen: 'Marketplace',
                },
              });
              next();
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
  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn(
          'absolute w-[30%] h-[8%]',
          LanguageManager.isRTL ? 'left-[35%]' : 'right-[35%]',
          Platform.OS === 'ios'
            ? screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-16'
              : 'top-24'
            : screenHeight <= SMALL_SCREEN_THRESHOLD
              ? 'top-20'
              : 'top-28'
        )}
        onPress={() => {
          // eslint-disable-next-line
          // @ts-ignore
          rootNavigation.navigate('MyOrders');
          next();
        }}
      >
        <Animated.View
          tw={LanguageManager.isRTL ? 'left-[-25%]' : 'right-[-25%]'}
          style={[
            {
              top: mask.y + mask.height - 100,
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
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('ShoppingCart');
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

export function MyOrdersScreenOverlay({ goTo, stop }: IOverlayComponentProps) {
  const { t } = useTranslationUtils();
  const [toggleTutorial] = useTutorialStore(useShallow((store) => [store.toggleTutorial]));
  const [user] = useAuthStore(useShallow((store) => [store.user]));
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
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
                params: {
                  screen: 'Marketplace',
                },
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
                  rootNavigation.navigate('ProduceDetailsStack', {
                    screen: 'Root',
                    params: MOCKED_PRODUCE_DETAILS_DATA,
                  });
                  goTo(EMarketplaceTutorialSteps.LIST_FOR_SALE_STEP);
                  break;
                default:
                  rootNavigation.navigate('RootMainTabStack');
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

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw={cn('absolute w-full h-[7%] items-end z-10')}
        style={{
          top: mask.y + mask.height - (screenHeight <= SMALL_SCREEN_THRESHOLD ? 50 : 60),
        }}
        onPress={() => {
          rootNavigation.navigate(
            // eslint-disable-next-line
            // @ts-ignore
            'EditCrateWeightAndPricing',
            {
              ...MOCKED_PRODUCE_DETAILS_DATA,
              companyCurrency: MOCKED_PRODUCE_DETAILS_DATA.currency,
            }
          );
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
              // eslint-disable-next-line
              // @ts-ignore
              rootNavigation.navigate('Marketplace', {
                screen: 'MarketplaceRoot',
                params: {
                  screen: 'MyOrders',
                },
              });
              goTo(EMarketplaceTutorialSteps.MY_ORDERS_STEP);
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

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const colors = useTailwindColors();

  const blinkAnim = useBlinkAnimation();

  return (
    <View tw="h-full w-full absolute">
      <TouchableOpacity
        tw="absolute w-[45%] h-[5%] items-start self-end z-10"
        style={{
          top: mask.y,
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
              rootNavigation.navigate('ProduceDetailsStack', {
                screen: 'Root',
                params: MOCKED_PRODUCE_DETAILS_DATA,
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

  const rootNavigation = useNavigation<NativeStackNavigationProp<MainTabStackRoutes>>();
  const colors = useTailwindColors();

  return (
    <View tw="h-full w-full absolute">
      <Icon
        name="cursor-pointer"
        size={40}
        color={colors.green.primary}
        style={{
          top:
            screenHeight > MEDIUM_SCREEN_THRESHOLD
              ? '60%'
              : screenHeight <= MEDIUM_SCREEN_THRESHOLD && screenHeight >= SMALL_SCREEN_THRESHOLD
                ? '70%'
                : '75%',
          left: LanguageManager.isRTL ? undefined : '50%',
          right: LanguageManager.isRTL ? '50%' : undefined,
        }}
      />

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
