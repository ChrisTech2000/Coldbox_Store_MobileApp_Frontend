import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import React, { forwardRef, useMemo } from 'react';
import {
  FlatList,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Modalize } from 'react-native-modalize';
import { Divider, List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import type { BottomSheetBaseProps } from '#ui/components/BottomSheet';
import * as BottomSheetUI from '#ui/components/BottomSheet';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { BOTTOM_NAV_HEIGHT } from '#ui/primitives/withSafeArea';

import RBAC from '#common/RBAC';
import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { ListItemArrow } from '#screens/Dashboard/AccountDetails/components/ListItemArrow';
import { Marketplace1ScreenOverlay } from '#screens/Dashboard/Tutorial/MarketplaceOverlay';
import { MoreNavigationOverlay } from '#screens/Dashboard/Tutorial/MoreNavigationOverlay';
import {
  ECommonTutorialSteps,
  EMarketplaceTutorialSteps,
} from '#screens/Dashboard/Tutorial/utils/constants';

import type { DashboardMainRoutePaths } from '../Main';

type NavigationState = TabNavigationState<ParamListBase>;
type NavigationRoutes = Array<DashboardMainRoutePaths>;

const BOTTOM_NAV_ITEMS: NavigationRoutes = ['Dashboard', 'Marketplace', 'Analytics'];
const BOTTOM_SHEET_ITEMS: NavigationRoutes = ['MarketPrice', 'History', 'CoolingUnits'];

const ROUTE_TITLE_META = {
  Dashboard: 'navigation.bottomTabs.Dashboard',
  Marketplace: 'navigation.dashboard.Marketplace',
  Analytics: 'navigation.bottomTabs.Analytics',
  MarketPrice: 'navigation.bottomTabs.MarketPrice',
  History: 'navigation.bottomTabs.History',
  CoolingUnits: 'navigation.bottomTabs.CoolingUnits',
  ShoppingCart: 'navigation.dashboard.ShoppingCart',
} satisfies Record<DashboardMainRoutePaths, TranslationPaths>;

const ICON_SIZE = 24;
const ICON_DEFAULT_COLOR = colors.zinc[500];

function filterBottomNavItems(state: NavigationState, shouldAdd: boolean) {
  const list: NavigationRoutes = shouldAdd ? [...BOTTOM_NAV_ITEMS, 'History'] : BOTTOM_NAV_ITEMS;
  return state.routes.filter(({ name }) => list.includes(name as DashboardMainRoutePaths));
}

function filterBottomSheetItems(state: NavigationState, shouldExclude: boolean) {
  const list = shouldExclude
    ? [...BOTTOM_SHEET_ITEMS.slice(0, 1), ...BOTTOM_SHEET_ITEMS.slice(2)]
    : BOTTOM_SHEET_ITEMS;
  return state.routes.filter(({ name }) => list.includes(name as DashboardMainRoutePaths));
}

function BottomNavigation({ state, navigation, descriptors }: BottomTabBarProps) {
  const [modalRef, modalActions] = BottomSheetUI.useBottomSheet();
  const routeOptions = descriptors[state.routes[state.index].key].options;
  return (
    <React.Fragment>
      <BottomNavBar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        tabBarStyle={routeOptions.tabBarStyle as StyleProp<ViewStyle>}
        {...modalActions}
      />
      <BottomSheet
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        ref={modalRef}
        close={modalActions.close}
      />
    </React.Fragment>
  );
}

function BottomNavBar(
  props: Pick<BottomTabBarProps, 'state' | 'descriptors' | 'navigation'> & {
    tabBarStyle: StyleProp<ViewStyle>;
  } & Omit<BottomSheetBaseProps, 'ref'>
) {
  const { state, descriptors, navigation, tabBarStyle, open: openModal, close: closeModal } = props;

  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const includeHistoryTab = !guard('VIEW', 'MarketplaceListing');

  const navItems = useMemo(
    () => filterBottomNavItems(state, includeHistoryTab),
    [state, includeHistoryTab]
  );

  useWalkthroughStep({
    number: ECommonTutorialSteps.MORE_STEP,
    OverlayComponent: MoreNavigationOverlay,
    fullScreen: true,
  });

  useWalkthroughStep({
    number: EMarketplaceTutorialSteps.MARKETPLACE_STEP_1,
    OverlayComponent: Marketplace1ScreenOverlay,
    fullScreen: true,
  });

  return (
    <View tw="absolute bottom-0 left-0 z-[9999] w-full" style={tabBarStyle}>
      <SkiaShadow blur={3} dx={0} dy={2} color={colors.zinc[300]} borderRadius={16}>
        <View
          tw="flex-row items-center justify-evenly px-2 bg-white pt-0.5"
          style={{ paddingBottom: bottom, height: BOTTOM_NAV_HEIGHT }}
        >
          {navItems.map((route, idx) => (
            <TabItem
              key={route.key}
              title={t(ROUTE_TITLE_META[route.name as DashboardMainRoutePaths])}
              onPress={(evt: GestureResponderEvent) => {
                evt.stopPropagation();
                navigation.navigate(route.name);
                closeModal();
              }}
              renderIcon={descriptors?.[route.key]?.options?.tabBarIcon}
              isFocused={state.index === idx}
            />
          ))}
          <View>
            <TabItem
              title={t('navigation.bottomTabs.More')}
              onPress={(evt: GestureResponderEvent) => {
                evt.stopPropagation();
                openModal();
              }}
              renderIcon={() => (
                <MaterialCommunityIcon
                  name="dots-vertical"
                  color={state.index >= 3 ? colors.white : ICON_DEFAULT_COLOR}
                  size={ICON_SIZE}
                />
              )}
              isFocused={state.index >= 3}
            />
          </View>
        </View>
      </SkiaShadow>
    </View>
  );
}

const BottomSheet = forwardRef<
  Modalize,
  Pick<BottomTabBarProps, 'state' | 'descriptors' | 'navigation'> &
    Pick<BottomSheetBaseProps, 'close'>
>(function Component(props, ref) {
  const { state, descriptors, navigation, close: closeModal } = props;

  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const excludeHistoryTab = !guard('VIEW', 'MarketplaceListing');

  const sheetItems = useMemo(
    () => filterBottomSheetItems(state, excludeHistoryTab),
    [state, excludeHistoryTab]
  );

  return (
    <BottomSheetUI.Root
      ref={ref}
      modalStyle={{ marginBottom: BOTTOM_NAV_HEIGHT }}
      usePortal={false}
    >
      <BottomSheetUI.Content>
        <FlatList
          data={sheetItems}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => (
            <List.Item
              tw="px-0 m-0 py-2"
              title={t(ROUTE_TITLE_META[item.name as DashboardMainRoutePaths])}
              left={() =>
                descriptors?.[item.key]?.options?.tabBarIcon?.({
                  focused: false,
                  color: ICON_DEFAULT_COLOR,
                  size: ICON_SIZE,
                }) ?? null
              }
              right={ListItemArrow}
              onPress={(evt) => {
                evt.stopPropagation();
                closeModal();
                switch (item.name) {
                  case 'History':
                    return navigation.navigate('History', { screen: 'RootHistoryTabStack' });
                  case 'Orders':
                    return navigation.navigate('Orders', { screen: 'OrdersRoot' });
                  default:
                    return navigation.navigate(item.name);
                }
              }}
            />
          )}
        />
      </BottomSheetUI.Content>
    </BottomSheetUI.Root>
  );
});

type TabItemProps = {
  title: string;
  isFocused?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  renderIcon?: (iconProps: { focused: boolean; color: string; size: number }) => React.ReactNode;
};

const TabItemComponent = ({ title, isFocused, onPress, renderIcon }: TabItemProps) => (
  <View tw="flex-col items-center justify-start space-y-1">
    <View tw="rounded-full overflow-hidden">
      <Touchable
        tw={cn(
          'items-center justify-center w-16 h-8',
          isFocused ? 'bg-green-primary' : 'bg-transparent'
        )}
        onPress={onPress}
        rippleColor={paperTheme.colors.backdrop}
      >
        {renderIcon?.({
          focused: false,
          color: isFocused ? colors.white : ICON_DEFAULT_COLOR,
          size: ICON_SIZE,
        })}
      </Touchable>
    </View>
    <Text tw={cn('leading-none tracking-widest text-zinc-500 text-xs', isFocused && 'text-black')}>
      {title}
    </Text>
  </View>
);

const areEqual = (prev: TabItemProps, next: TabItemProps) =>
  prev.title === next.title &&
  prev.isFocused === next.isFocused &&
  prev.onPress === next.onPress &&
  prev.renderIcon === next.renderIcon;

export const TabItem = React.memo(TabItemComponent, areEqual);

export default function BottomNavigationWrapper(props: BottomTabBarProps) {
  return <BottomNavigation {...props} />;
}
